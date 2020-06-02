beforeEach(function () {
  jasmine.addMatchers({
    toBePrimitive: function () {
      return {
        compare: function (target, expected) {
          var type = typeof target

          return {
            pass: type !== 'object' && type !== 'function'
          }
        }
      }
    },

    toHaveLength: function () {
      return {
        compare: function (target, expected) {
          return {
            pass: target.length === expected
          }
        }
      }
    },

    toBeA: function () {
      return {
        compare: function (target, expected) {
          return {
            pass: typeof target === expected
          }
        }
      }
    }
  })
})
