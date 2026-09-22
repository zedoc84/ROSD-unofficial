import { ROSD } from "./config.mjs";
import { exportActorPdf } from "./pdf.mjs";
import { ITEM_CATEGORIES } from "./item-sheet.mjs";
import { spendItem } from "./dice.mjs";
import { rollCheck, rollMelee, rollShoot, castSpell, useAbility, rollSurvival, markUsed, combatProfile, signed } from "./dice.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

const IMAGE_EXT = /\.(png|jpe?g)$/i;

/** Sélecteur de fichier limité aux PNG et JPEG. */
function pickImage(current, callback) {
  const FP = foundry.applications.apps?.FilePicker?.implementation ?? FilePicker;
  new FP({
    type: "image", current: current || "",
    callback: path => {
      if (!IMAGE_EXT.test(path.split("?")[0])) {
        return ui.notifications.warn("Choisissez une image PNG ou JPEG (.png, .jpg, .jpeg).");
      }
      return callback(path);
    }
  }).browse();
}

const escapeText = t => String(t ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const labelMap = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v.label ?? v]));

class ROSDBaseSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["rosd", "sheet", "actor"],
    position: { width: 780, height: 820 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      exportPdf: ROSDBaseSheet.#onExportPdf,
      itemEdit: ROSDBaseSheet.#onItemEdit,
      itemDelete: ROSDBaseSheet.#onItemDelete,
      itemChat: ROSDBaseSheet.#onItemChat,
      itemUse: ROSDBaseSheet.#onItemUse,
      itemEquip: ROSDBaseSheet.#onItemEquip,
      itemWield: ROSDBaseSheet.#onItemWield,
      rosdTab: ROSDBaseSheet.#onTab,
      portrait: ROSDBaseSheet.#onPortrait,
      editIcon: ROSDBaseSheet.#onEditIcon,
      rollStat: ROSDBaseSheet.#onRollStat,
      rollSkill: ROSDBaseSheet.#onRollSkill,
      melee: ROSDBaseSheet.#onMelee,
      shoot: ROSDBaseSheet.#onShoot,
      cast: ROSDBaseSheet.#onCast,
      ability: ROSDBaseSheet.#onAbility,
      describe: ROSDBaseSheet.#onDescribe,
      toggleUsed: ROSDBaseSheet.#onToggleUsed,
      remove: ROSDBaseSheet.#onRemove,
      newScenario: ROSDBaseSheet.#onNewScenario,
      survival: ROSDBaseSheet.#onSurvival,
      applyProfile: ROSDBaseSheet.#onApplyProfile,
      levelUp: ROSDBaseSheet.#onLevelUp
    }
  };

  _tab = "main";

  /** Ajoute un bouton « PDF » dans la barre de titre, à côté des boutons de Foundry. */
  async _renderFrame(options) {
    const frame = await super._renderFrame(options);
    const header = frame.querySelector(".window-header");
    if (header && !header.querySelector('[data-action="exportPdf"]')) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "header-control icon fa-solid fa-file-pdf";
      btn.dataset.action = "exportPdf";
      btn.dataset.tooltip = "Exporter en PDF";
      btn.setAttribute("aria-label", "Exporter en PDF");
      const first = header.querySelector("button.header-control");
      if (first) first.before(btn); else header.append(btn);
    }
    return frame;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.document;
    const sys = actor.system;
    const prof = combatProfile(actor);

    Object.assign(context, {
      actor, system: sys, editable: this.isEditable, config: ROSD, profile: prof,
      stats: Object.entries(ROSD.stats).map(([key, s]) => {
        const st = sys.stats[key];
        return { key, label: s.label, abbr: s.abbr, value: st.value, mod: st.mod, item: st.item ?? 0,
          itemSources: st.itemSources ?? "", total: st.total, split: st.total !== st.value,
          signed: key !== "move" && key !== "armour" };
      }),
      skills: Object.entries(ROSD.skills).map(([key, label]) => ({
        key, label, value: sys.skills?.[key] ?? 0 })),
      meleeChoices: {
        ...Object.fromEntries(actor.items.filter(i => i.type === "objet" && ["melee", "thrown"].includes(i.system.weapon.kind))
          .map(i => [`item:${i.id}`, `★ ${i.name} (${i.system.weapon.kind === "thrown" ? -2 : i.system.weapon.dmg >= 0 ? "+" + i.system.weapon.dmg : i.system.weapon.dmg} dég.)`])),
        ...labelMap(ROSD.meleeWeapons)
      },
      rangedChoices: {
        ...Object.fromEntries(actor.items.filter(i => i.type === "objet" && ["ranged", "thrown"].includes(i.system.weapon.kind))
          .map(i => [`item:${i.id}`, `★ ${i.name} (${i.system.weapon.range}", ${i.system.weapon.dmg >= 0 ? "+" + i.system.weapon.dmg : i.system.weapon.dmg} dég.)`])),
        ...labelMap(ROSD.rangedWeapons)
      },
      casterChoices: ROSD.casterItems,
      equipmentList: ROSD.basicEquipment,
      fightLabel: signed(prof.fight),
      shootLabel: signed(prof.shoot)
    });

    if (sys.abilities) {
      const owned = new Set(sys.abilities.map(a => a.key));
      context.abilities = sys.abilities.map((a, i) => ({
        ...a, i, label: ROSD.abilities[a.key]?.label ?? a.key,
        en: ROSD.abilities[a.key]?.en ?? "", desc: ROSD.abilities[a.key]?.desc ?? "" }));
      context.abilityChoices = Object.fromEntries(Object.entries(ROSD.abilities)
        .filter(([k]) => !owned.has(k))
        .sort((a, b) => a[1].label.localeCompare(b[1].label))
        .map(([k, v]) => [k, v.label]));
    }
    if (sys.spells) {
      context.spells = sys.spells.map((s, i) => {
        const sp = ROSD.spells[s.key] ?? {};
        let tag = "";
        if (sp.attack) tag = `Attaque ${signed(sp.attack)}`;
        else if (sp.will) tag = `Volonté ND ${sp.will}`;
        else if (sp.heal) tag = `Soins ${sp.heal}`;
        return { ...s, i, label: sp.label ?? s.key, en: sp.en ?? "", desc: sp.desc ?? "", tag };
      });
      context.spellChoices = Object.fromEntries(Object.entries(ROSD.spells)
        .sort((a, b) => a[1].label.localeCompare(b[1].label))
        .map(([k, v]) => [k, v.label]));
    }
    context.itemsList = actor.items.contents
      .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
      .map(i => {
        const sy = i.system;
        const wielded = actor.system.weapons?.melee === `item:${i.id}` || actor.system.weapons?.ranged === `item:${i.id}`;
        const bonus = Object.entries(sy.bonus).filter(([, v]) => v)
          .map(([k, v]) => `${v > 0 ? "+" : ""}${v} ${{ move: "M", fight: "C", shoot: "T", armour: "A", will: "V", dmg: "dég." }[k]}`).join(" ");
        const hasCharges = sy.charges.max > 0;
        return {
          id: i.id, name: i.name, img: i.img, magic: sy.magic, quantity: sy.quantity, slots: sy.slots,
          category: ITEM_CATEGORIES[sy.category] ?? "", equipped: sy.equipped, wielded,
          isWeapon: sy.isWeapon, weaponInfo: sy.isWeapon ? `${sy.weapon.dmg >= 0 ? "+" : ""}${sy.weapon.dmg} dég.${sy.weapon.range ? ` · ${sy.weapon.range}"` : ""}` : "",
          bonus, active: sy.activation && sy.active,
          charges: hasCharges ? `${sy.charges.value}/${sy.charges.max}` : "",
          usable: (sy.consumable && sy.quantity > 0) || (sy.activation && !sy.active && (!hasCharges || sy.charges.value > 0))
            || (hasCharges && sy.charges.value > 0 && ["", "attack", "recoverSpell", "recoverAbility"].includes(sy.property) && !sy.skills.a),
          useLabel: sy.activation && !sy.active && !sy.consumable ? "Activer" : "Utiliser"
        };
      });
    context.slotInfo = this.#slotInfo();
    return context;
  }

  /** Emplacements utilisés : cases texte remplies + objets glissés. */
  #slotInfo() {
    const actor = this.document, s = actor.system;
    const itemSlots = actor.items.contents.reduce((n, i) => n + (i.system.slots ?? 0), 0);
    if (actor.type === "ranger") {
      const text = ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6"].filter(k => s.gear[k]?.trim()).length;
      const used = text + itemSlots;
      return { used, max: 6, over: used > 6,
        text: `Emplacements utilisés : ${used} / 6 (${text} en cases texte, ${itemSlots} par les objets). La dague gratuite et les objets à 0 emplacement ne comptent pas.` };
    }
    if (actor.type === "companion") {
      if (s.animal) return { used: 0, max: 0, over: actor.items.size > 0, text: "Un animal ne peut porter ni objet ni trésor." };
      const text = ["item1", "item2"].filter(k => s.gear[k]?.trim()).length;
      const used = text + itemSlots;
      return { used, max: 2, over: used > 2,
        text: `Objets portés : ${used} / 2 en plus de l'équipement de base (${text} en cases texte, ${itemSlots} par les objets).` };
    }
    return null;
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const el = this.element;
    this.#applyTab();
    this.#bindDragDrop(el);
    if (this.isEditable) el.querySelectorAll("[data-action='editIcon']").forEach(icon =>
      icon.addEventListener("contextmenu", ev => { ev.preventDefault(); this.#resetIcon(icon); }));
    el.querySelectorAll("select[data-add]").forEach(sel => sel.addEventListener("change", async ev => {
      const key = ev.currentTarget.value;
      if (!key) return;
      const list = ev.currentTarget.dataset.add;
      const arr = foundry.utils.deepClone(this.document.system[list] ?? []);
      arr.push({ key, used: false });
      await this.document.update({ [`system.${list}`]: arr });
    }));
  }

  /* ------------------------- glisser-déposer ------------------------- */
  /** La gestion native est neutralisée : ce système gère lui-même les dépôts. */
  async _onDrop(event) {}

  #bindDragDrop(el) {
    // Rendre chaque objet de la liste déplaçable
    el.querySelectorAll("[data-item-id][draggable='true']").forEach(li => {
      li.addEventListener("dragstart", ev => {
        const item = this.document.items.get(li.dataset.itemId);
        if (!item) return;
        ev.dataTransfer.setData("text/plain", JSON.stringify(item.toDragData()));
        ev.dataTransfer.effectAllowed = "copyMove";
        li.classList.add("dragging");
      });
      li.addEventListener("dragend", () => li.classList.remove("dragging"));
    });
    if (el.dataset.rosdDrop) return;
    el.dataset.rosdDrop = "1";
    el.addEventListener("dragover", ev => {
      if (!this.isEditable) return;
      ev.preventDefault();
      el.classList.add("rosd-dragover");
    });
    el.addEventListener("dragleave", ev => { if (!el.contains(ev.relatedTarget)) el.classList.remove("rosd-dragover"); });
    el.addEventListener("drop", ev => { el.classList.remove("rosd-dragover"); this.#onDropData(ev); });
  }

  async #onDropData(event) {
    event.preventDefault();
    const TE = foundry.applications.ux?.TextEditor?.implementation ?? TextEditor;
    const data = TE.getDragEventData(event);
    if (data?.type !== "Item") return;
    const actor = this.document;
    if (!actor.isOwner) return ui.notifications.warn("Vous ne possédez pas cette fiche.");
    const item = await Item.implementation.fromDropData(data);
    if (!item) return;

    // Déplacement à l'intérieur de la même fiche : tri
    if (item.parent?.uuid === actor.uuid) {
      const targetLi = event.target.closest?.("[data-item-id]");
      const target = targetLi && actor.items.get(targetLi.dataset.itemId);
      if (!target || target.id === item.id) return;
      const siblings = actor.items.contents.filter(i => i.id !== item.id);
      const sorter = foundry.utils.performIntegerSort ?? globalThis.SortingHelpers?.performIntegerSort;
      const updates = sorter(item, { target, siblings })
        .map(u => ({ _id: u.target.id, ...u.update }));
      return actor.updateEmbeddedDocuments("Item", updates);
    }

    if (item.type !== "objet") return ui.notifications.warn("Seuls les objets peuvent être déposés sur cette fiche.");
    if (actor.type === "companion" && actor.system.animal) {
      return ui.notifications.warn(`${actor.name} est un animal : il ne peut porter ni objet ni trésor.`);
    }

    // Empilement : même nom, non magique → on ajoute à la quantité
    const same = actor.items.find(i => i.name === item.name && !i.system.magic && !item.system.magic);
    if (same) await same.update({ "system.quantity": same.system.quantity + (item.system.quantity || 1) });
    else {
      const [created] = await actor.createEmbeddedDocuments("Item", [item.toObject()]);
      // Arme reçue : elle est prise en main si aucune arme d'objet ne l'est déjà
      if (created?.system.isWeapon) {
        const field = created.system.weapon.kind === "ranged" ? "ranged" : "melee";
        if (!String(actor.system.weapons?.[field] ?? "").startsWith("item:")) {
          await actor.update({ [`system.weapons.${field}`]: `item:${created.id}` });
        }
      }
    }

    // Venant d'une autre fiche : l'objet est transféré (Ctrl/Alt pour copier)
    const source = item.parent;
    if (source && source.documentName === "Actor" && !(event.ctrlKey || event.altKey || event.metaKey)) {
      if (source.isOwner) {
        await item.delete();
        ui.notifications.info(`${item.name} : transféré de ${source.name} à ${actor.name}.`);
      }
    }

    const info = this.#slotInfo();
    if (info?.over) ui.notifications.warn(`${actor.name} dépasse sa capacité : ${info.used} / ${info.max}.`);
  }

  /* ------------------------- actions sur les objets ------------------------- */
  static #onItemEdit(event, target) {
    this.document.items.get(target.closest("[data-item-id]").dataset.itemId)?.sheet.render(true);
  }

  static async #onItemDelete(event, target) {
    const item = this.document.items.get(target.closest("[data-item-id]").dataset.itemId);
    if (!item) return;
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Retirer l'objet" }, content: `<p>Retirer <b>${item.name}</b> de ${this.document.name} ?</p>` });
    if (!ok) return;
    const w = this.document.system.weapons ?? {}, upd = {};
    if (w.melee === `item:${item.id}`) upd["system.weapons.melee"] = this.document.type === "creature" ? "natural" : "unarmed";
    if (w.ranged === `item:${item.id}`) upd["system.weapons.ranged"] = "none";
    if (Object.keys(upd).length) await this.document.update(upd);
    await item.delete();
  }

  static #onItemChat(event, target) {
    const item = this.document.items.get(target.closest("[data-item-id]").dataset.itemId);
    if (!item) return;
    const s = item.system;
    const desc = escapeText(s.description);
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.document }),
      content: `<div class="rosd-card"><header><h3>${item.name}</h3><span class="rosd-tn">${ITEM_CATEGORIES[s.category] ?? ""}${s.magic ? " · magique" : ""}</span></header>
        <p>${String(desc).replace(/\n/g, "<br>") || "<i>Aucune description.</i>"}</p></div>`
    });
  }

  static async #onItemUse(event, target) {
    const actor = this.document;
    const item = actor.items.get(target.closest("[data-item-id]").dataset.itemId);
    if (!item) return;
    const sy = item.system;
    const notes = [];

    // Objet d'attaque (cocktail explosif, orbe de boule de feu)
    if (sy.property === "attack" && sy.use.attack) {
      await spendItem(item);
      return rollShoot(actor, { label: item.name, attack: sy.use.attack, isItem: true, desc: sy.description });
    }
    // Récupérer un sort ou une capacité
    if (sy.property === "recoverSpell" || sy.property === "recoverAbility") {
      const list = sy.property === "recoverSpell" ? "spells" : "abilities";
      const table = list === "spells" ? ROSD.spells : ROSD.abilities;
      const used = (actor.system[list] ?? []).filter(e => e.used);
      if (!used.length) return ui.notifications.warn(list === "spells" ? "Aucun sort déjà lancé." : "Aucune capacité déjà utilisée.");
      const key = await foundry.applications.api.DialogV2.wait({
        window: { title: item.name }, classes: ["rosd", "rosd-dialog"],
        content: `<div class="form-group"><label>Récupérer</label><select name="k">${used.map(e => `<option value="${e.key}">${table[e.key]?.label ?? e.key}</option>`).join("")}</select></div>`,
        buttons: [{ action: "ok", label: "Récupérer", default: true, callback: (e, b) => b.form.elements.k.value }, { action: "cancel", label: "Annuler" }],
        rejectClose: false });
      if (!key || key === "cancel") return;
      await markUsed(actor, list, key, false);
      notes.push(`récupère ${table[key]?.label ?? key}`);
    }

    // Effets immédiats
    const h = actor.system.health, upd = {};
    if (sy.use.fullHeal) { upd["system.health.value"] = h.max; notes.push("revient à pleine Santé"); }
    else if (sy.use.heal) { upd["system.health.value"] = Math.min(h.max, h.value + sy.use.heal); notes.push(`récupère jusqu'à ${sy.use.heal} Santé`); }
    if (sy.use.tempHealth) { upd["system.health.value"] = (upd["system.health.value"] ?? h.value) + sy.use.tempHealth; notes.push(`+${sy.use.tempHealth} Santé temporaire`); }
    if (sy.use.cure && actor.system.status) { upd["system.status.poisoned"] = false; notes.push("n'est plus empoisonné"); }
    if (sy.use.cureDisease && actor.system.status) { upd["system.status.diseased"] = false; notes.push("est guéri de la maladie"); }
    if (Object.keys(upd).length) await actor.update(upd);

    // Activation (bonus jusqu'à la fin du scénario)
    if (sy.activation && !sy.active) {
      await item.update({ "system.active": true });
      const b = Object.entries(sy.bonus).filter(([, v]) => v).map(([k, v]) => `${v > 0 ? "+" : ""}${v} ${{ move: "Mouvement", fight: "Combat", shoot: "Tir", armour: "Armure", will: "Volonté", dmg: "dégâts" }[k]}`);
      if (b.length) notes.push(`bonus actifs : ${b.join(", ")}`);
      if (sy.property === "magic") notes.push("l'arme compte comme magique");
    }
    await spendItem(item);

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `<div class="rosd-card"><header><h3>${escapeText(item.name)}</h3><span class="rosd-tn">${sy.activation && !sy.consumable ? "activé" : "utilisé"}</span></header>
        <p>${escapeText(actor.name)} ${notes.length ? notes.join(" ; ") : "utilise l'objet"}.</p>
        ${sy.description ? `<p class="rosd-detail">${escapeText(sy.description)}</p>` : ""}</div>`
    });
  }

  static async #onItemEquip(event, target) {
    const item = this.document.items.get(target.closest("[data-item-id]").dataset.itemId);
    if (item) await item.update({ "system.equipped": !item.system.equipped });
  }

  /** Prendre en main une arme (mêlée ou tir) depuis la liste. */
  static async #onItemWield(event, target) {
    const actor = this.document;
    const item = actor.items.get(target.closest("[data-item-id]").dataset.itemId);
    if (!item?.system.isWeapon) return;
    const key = `item:${item.id}`;
    const field = item.system.weapon.kind === "ranged" ? "ranged" : "melee";
    const current = actor.system.weapons[field];
    const fallback = field === "ranged" ? "none" : (actor.type === "creature" ? "natural" : "unarmed");
    await actor.update({ [`system.weapons.${field}`]: current === key ? fallback : key, [`system.weapons.magic`]: false });
  }


  #applyTab() {
    const el = this.element;
    el.querySelectorAll("[data-tab-link]").forEach(a => a.classList.toggle("active", a.dataset.tabLink === this._tab));
    el.querySelectorAll("[data-tab-panel]").forEach(p => p.classList.toggle("active", p.dataset.tabPanel === this._tab));
  }

  /* ----------------------------- actions ----------------------------- */
  static #onTab(event, target) { this._tab = target.dataset.tabLink; this.#applyTab(); }

  static async #onPortrait() {
    if (!this.isEditable) return;
    pickImage(this.document.img, path => this.document.update({ img: path }));
  }

  /** Icône d'une capacité / d'un sort, ou emblème de l'en-tête. */
  static async #onEditIcon(event, target) {
    if (!this.isEditable) return;
    const { list, index } = target.dataset;
    if (!list) {
      return pickImage(this.document.system.emblem, path => this.document.update({ "system.emblem": path }));
    }
    const arr = foundry.utils.deepClone(this.document.system[list]);
    const entry = arr[Number(index)];
    pickImage(entry.img, path => {
      entry.img = path;
      return this.document.update({ [`system.${list}`]: arr });
    });
  }

  /** Clic droit sur une icône : retour à l'icône par défaut. */
  async #resetIcon(target) {
    const { list, index } = target.dataset;
    if (!list) return this.document.update({ "system.emblem": "" });
    const arr = foundry.utils.deepClone(this.document.system[list]);
    arr[Number(index)].img = "";
    return this.document.update({ [`system.${list}`]: arr });
  }

  static #onExportPdf() { return exportActorPdf(this.document); }

  static #onRollStat(event, target) {
    const key = target.dataset.key;
    if (key === "fight") return rollMelee(this.document);
    if (key === "shoot") return rollShoot(this.document);
    return rollCheck(this.document, { kind: "stat", key });
  }
  static #onRollSkill(event, target) {
    return rollCheck(this.document, { kind: "skill", key: target.dataset.key });
  }
  static #onMelee() { return rollMelee(this.document); }
  static #onShoot() { return rollShoot(this.document); }

  static #onCast(event, target) {
    const entry = this.document.system.spells[Number(target.dataset.index)];
    return castSpell(this.document, entry.key);
  }
  static async #onAbility(event, target) {
    const entry = this.document.system.abilities[Number(target.dataset.index)];
    if (entry.used) {
      const ok = await foundry.applications.api.DialogV2.confirm({
        window: { title: "Capacité déjà utilisée" },
        content: "<p>Chaque capacité ne s'utilise qu'une fois par scénario. L'utiliser quand même ?</p>" });
      if (!ok) return;
    }
    return useAbility(this.document, entry.key);
  }
  static async #onDescribe(event, target) {
    const list = target.dataset.list;
    const entry = this.document.system[list][Number(target.dataset.index)];
    const data = (list === "spells" ? ROSD.spells : ROSD.abilities)[entry.key];
    if (!data) return;
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.document }),
      content: `<div class="rosd-card"><header><h3>${data.label}</h3><span class="rosd-tn">${data.en}</span></header><p>${data.desc}</p></div>`
    });
  }
  static async #onToggleUsed(event, target) {
    const list = target.dataset.list;
    const arr = foundry.utils.deepClone(this.document.system[list]);
    const e = arr[Number(target.dataset.index)];
    e.used = !e.used;
    await this.document.update({ [`system.${list}`]: arr });
  }
  static async #onRemove(event, target) {
    const list = target.dataset.list;
    const arr = foundry.utils.deepClone(this.document.system[list]);
    arr.splice(Number(target.dataset.index), 1);
    await this.document.update({ [`system.${list}`]: arr });
  }

  static async #onNewScenario() {
    const actor = this.document;
    const res = await foundry.applications.api.DialogV2.wait({
      window: { title: "Nouveau scénario" },
      content: `<p>Réinitialiser les capacités et sorts utilisés et retirer le poison ?</p>
        <div class="form-group"><label>Remettre la Santé au maximum</label><input type="checkbox" name="heal" checked></div>`,
      buttons: [
        { action: "ok", label: "Réinitialiser", default: true, callback: (e, b) => ({ heal: b.form.elements.heal.checked }) },
        { action: "cancel", label: "Annuler" }
      ], rejectClose: false });
    if (!res || res === "cancel") return;
    const s = actor.system;
    const upd = {};
    if (s.abilities) upd["system.abilities"] = s.abilities.map(a => ({ ...a, used: false }));
    if (s.spells) upd["system.spells"] = s.spells.map(a => ({ ...a, used: false }));
    if (s.status) upd["system.status.poisoned"] = false;
    if (res.heal) upd["system.health.value"] = s.health.max;
    await actor.update(upd);
    // Objets : fin des effets activés, consommables vides retirés, objets sans charge redevenus ordinaires
    const itemUpd = [], itemDel = [];
    for (const i of actor.items) {
      const sy = i.system;
      if (sy.consumable && sy.quantity <= 0) { itemDel.push(i.id); continue; }
      const u = { _id: i.id };
      if (sy.active) u["system.active"] = false;
      if (sy.charges.max > 0 && sy.charges.value <= 0 && ["magic", "brightness", "blocking", "elemental"].includes(sy.property)) {
        Object.assign(u, { "system.property": "", "system.magic": false, "system.activation": false,
          "system.bonus.fight": 0, "system.bonus.shoot": 0, "system.charges.max": 0 });
      }
      if (Object.keys(u).length > 1) itemUpd.push(u);
    }
    if (itemDel.length) await actor.deleteEmbeddedDocuments("Item", itemDel);
    if (itemUpd.length) await actor.updateEmbeddedDocuments("Item", itemUpd);
  }

  static #onSurvival() { return rollSurvival(this.document); }

  static async #onApplyProfile() {
    const actor = this.document;
    const sel = this.element.querySelector("select[data-profile]");
    const key = sel?.value;
    const table = actor.type === "companion" ? ROSD.companions : ROSD.bestiary;
    const p = table[key];
    if (!p) return ui.notifications.warn("Choisissez d'abord un profil dans la liste.");
    const [m, f, s, a, w, h] = p.stats;
    const upd = {
      name: !actor.name || /^(new|nouve)/i.test(actor.name) ? p.label : actor.name,
      "system.profile": key,
      "system.stats.move.value": m, "system.stats.fight.value": f, "system.stats.shoot.value": s,
      "system.stats.armour.value": a, "system.stats.will.value": w,
      "system.health.max": h, "system.health.value": h,
      "system.weapons.melee": p.melee ?? (actor.type === "creature" ? "natural" : "hand"),
      "system.weapons.ranged": p.ranged ?? "none"
    };
    if (actor.type === "companion") {
      Object.assign(upd, { "system.rp": p.rp, "system.baseGear": p.gear, "system.animal": !!p.animal });
      for (const k of Object.keys(ROSD.skills)) upd[`system.skills.${k}`] = p.skills?.[k] ?? 0;
    } else {
      Object.assign(upd, {
        "system.xp": p.xp, "system.traits": p.traits,
        "system.flags.undead": !!p.undead, "system.flags.animal": !!p.animal,
        "system.flags.large": !!p.large, "system.flags.flying": !!p.flying,
        "system.flags.poison": !!p.poison, "system.flags.disease": p.disease ?? 0,
        "system.flags.horrific": p.horrific ?? 0, "system.flags.partialImmunity": !!p.partialImmunity
      });
    }
    await actor.update(upd);
    if (actor.type === "companion" && !p.animal) {
      ui.notifications.info("Pensez à attribuer +3 à une compétence que le compagnon ne possède pas encore.");
    }
  }

  static async #onLevelUp() {
    const actor = this.document;
    const s = actor.system;
    const cost = ROSD.xpCost(s.level + 1);
    if (s.xp < cost) return ui.notifications.warn(`Il faut ${cost} PX pour atteindre le niveau ${s.level + 1}.`);
    await actor.update({ "system.level": s.level + 1, "system.xp": s.xp - cost });
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `<div class="rosd-card"><header><h3>Niveau ${s.level + 1} !</h3></header>
        <p>Bonus : <b>${ROSD.levelBonus(s.level + 1)}</b>.</p>
        ${s.spells?.length ? "<p>Lanceur de sorts : peut échanger un sort connu contre un autre.</p>" : ""}</div>`
    });
  }
}

/* ------------------------------------------------------------------ */
export class RangerSheet extends ROSDBaseSheet {
  static DEFAULT_OPTIONS = { classes: ["rosd", "sheet", "actor", "ranger"] };
  static PARTS = { sheet: { template: "systems/rosd/templates/ranger.hbs", scrollable: [".rosd-body"] } };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const s = this.document.system;
    const players = game.settings.get("rosd", "players");
    const r = ROSD.recruitment[players] ?? ROSD.recruitment[1];
    ctx.recruit = {
      players, total: Math.max(0, r.calc(s.brp) + (s.skills.leadership ?? 0)), max: r.max, activate: r.activate
    };
    ctx.canLevel = s.xp >= s.nextLevelCost;
    return ctx;
  }
}

export class CompanionSheet extends ROSDBaseSheet {
  static DEFAULT_OPTIONS = { classes: ["rosd", "sheet", "actor", "companion"], position: { width: 720, height: 760 } };
  static PARTS = { sheet: { template: "systems/rosd/templates/companion.hbs", scrollable: [".rosd-body"] } };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx.profileChoices = Object.fromEntries(Object.entries(ROSD.companions)
      .map(([k, v]) => [k, `${v.label} (${v.rp} PR)`]));
    return ctx;
  }
}

export class CreatureSheet extends ROSDBaseSheet {
  static DEFAULT_OPTIONS = { classes: ["rosd", "sheet", "actor", "creature"], position: { width: 680, height: 720 } };
  static PARTS = { sheet: { template: "systems/rosd/templates/creature.hbs", scrollable: [".rosd-body"] } };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx.profileChoices = Object.fromEntries(Object.entries(ROSD.bestiary)
      .sort((a, b) => a[1].label.localeCompare(b[1].label))
      .map(([k, v]) => [k, `${v.label} (${v.xp} PX)`]));
    ctx.aiText = ROSD.creatureAI;
    return ctx;
  }
}
