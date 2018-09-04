import { observable, action, computed, autorunAsync } from "mobx"
import { addAttribute } from "../utils"

const hasLocalStorage = typeof window !== "undefined" && window.localStorage

export class Entity {
  id = Math.random()
  @observable
  name = "Entity"
  @observable
  x = 0
  @observable
  y = 0
  @observable
  attributes = []

  constructor(json) {
    if (json) {
      Object.assign(this, json)
    }
  }

  @computed
  get asJson() {
    const { id, name, x, y, attributes } = this
    return { id, name, x, y, attributes }
  }
}

export class EntityStore {
  @observable
  entities = []

  constructor() {
    autorunAsync(this.saveToLocalStorageReaction, 200)
  }

  @action
  loadJson(json) {
    this.entities = json.map(entityData => new Entity(entityData))
  }

  @action
  addEntity(name, x, y) {
    this.entities.push(
      new Entity({
        name,
        x,
        y
      })
    )
  }

  @action
  updateEntity(newEntity) {
    this.entities = addAttribute(newEntity, this.entities)
  }

  saveToLocalStorageReaction = () => {
    if (hasLocalStorage) {
      window.localStorage.setItem(
        "domain-model-app",
        JSON.stringify(this.asJson)
      )
    }
  }

  @action
  loadFromLocalStorage() {
    const data =
      hasLocalStorage && window.localStorage.getItem("domain-model-app")
    if (data) {
      this.loadJson(JSON.parse(data))
    } else {
      this.loadJson([])
    }
  }

  @computed
  get asJson() {
    return this.entities.map(e => e.asJson)
  }
}
