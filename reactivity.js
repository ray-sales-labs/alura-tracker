const project = {
  id: 1,
  description: 'alura-tracker 3.0'
}

const proxy = new Proxy(project, {
  get(originalObj, key, receptor) {
    console.log(`alguem pediu a chave ${key} do project`)
    return Reflect.get(originalObj, key, receptor)
  },

  set(originalObj, key, value) {
    console.log(`alguem alterou a chave ${key} para o valor ${value}`)
    originalObj[key] = value
  }
})

proxy.description = 'reatividade é mega bacana'
console.log(proxy.description)