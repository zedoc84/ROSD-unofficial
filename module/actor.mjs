export class ROSDActor extends Actor {
  /** Valeur d'initiative : phase des Rangers (Volonté), créatures (Santé), compagnons. */
  getRollData() {
    const data = super.getRollData();
    const s = this.system;
    if (this.type === "ranger") data.init = 300 + (s.stats?.will?.total ?? 0);
    else if (this.type === "creature") data.init = 200 + (s.health?.value ?? 0);
    else data.init = 100 + (s.stats?.will?.total ?? 0);
    return data;
  }

  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    const link = this.type !== "creature";
    this.updateSource({
      "prototypeToken.actorLink": link,
      "prototypeToken.disposition": link ? CONST.TOKEN_DISPOSITIONS.FRIENDLY : CONST.TOKEN_DISPOSITIONS.HOSTILE,
      "prototypeToken.bar1.attribute": "health"
    });
  }
}
