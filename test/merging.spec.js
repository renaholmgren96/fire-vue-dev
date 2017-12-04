import Vuefire from '../src'
import {
  db,
  Vue
} from './helpers'

Vue.use(Vuefire)

let mWithObjA, mWithObjB, mWithFn
beforeEach(async () => {
  mWithObjA = {
    firestore: {
      a: db.collection(1),
      b: db.collection(2)
    }
  }

  mWithObjB = {
    firestore: {
      a: db.collection(3),
      c: db.collection(4)
    }
  }

  mWithFn = {
    firestore () {
      return {
        a: db.collection(5),
        c: db.collection(6)
      }
    }
  }
})

test('should merge properties', () => {
  const vm = new Vue({
    mixins: [mWithObjA, mWithObjB],
    render: h => h('p', 'foo')
  })
  expect(vm.$firestoreRefs).toEqual({
    a: db.collection(3),
    b: db.collection(2),
    c: db.collection(4)
  })
})

test('supports function syntax', () => {
  const vm = new Vue({
    mixins: [mWithFn],
    render: h => h('p', 'foo')
  })
  expect(vm.$firestoreRefs).toEqual({
    a: db.collection(5),
    c: db.collection(6)
  })
})

test('should merge two functions', () => {
  const vm = new Vue({
    mixins: [mWithObjA, mWithObjB, mWithFn],
    render: h => h('p', 'foo')
  })
  expect(vm.$firestoreRefs).toEqual({
    a: db.collection(5),
    b: db.collection(2),
    c: db.collection(6)
  })
})
