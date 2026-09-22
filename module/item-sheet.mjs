const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

import { ROSD } from "./config.mjs";
export const ITEM_CATEGORIES = ROSD.itemCategories;

export class ObjectSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["rosd", "sheet", "item"],
    position: { width: 600, height: 720 },
    window: { resizable: true, icon: "fa-solid fa-sack" },
    form: { submitOnChange: true },
    actions: { portrait: ObjectSheet.#onPortrait }
  };
  static PARTS = { sheet: { template: "systems/rosd/templates/item.hbs", scrollable: [".rosd-body"] } };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    return Object.assign(ctx, {
      item: this.document, system: this.document.system, categories: ITEM_CATEGORIES,
      kinds: ROSD.weaponKinds, properties: ROSD.itemProperties,
      skillChoices: { "": "—", ...ROSD.skills }, skillModes: { passive: "Permanent", use: "À l'usage (1 charge)" },
      isWeapon: this.document.system.category === "weapon"
    });
  }

  static #onPortrait() {
    if (!this.isEditable) return;
    const FP = foundry.applications.apps?.FilePicker?.implementation ?? FilePicker;
    new FP({ type: "image", current: this.document.img, callback: path => this.document.update({ img: path }) }).browse();
  }
}
