function Helper(query) {
    if (!this || this.find !== Helper.prototype.find) {
        return new Helper(query)
    }
    this.length = 0
    if (query) {
        if (typeof query === 'string') {
            query = this.find(query)
        }
        if (query.nodeType || query === query.window) {
            // Single HTML element
            this.length = 1
            this[0] = query
        } else {
            // HTML element collection
            var i = query.length
            this.length = i
            while (i) {
                i -= 1
                this[i] = query[i]
            }
        }
    }
}


Helper.contains = function (container, element) {
    do {
        element = element.parentNode
        if (element === container) {
            return true
        }
    } while (element)
    return false
};

Object.assign(Helper.prototype, {
    find: function (query) {
        var container = this[0] || document
        if (typeof query === 'string') {
            if (container.querySelectorAll) {
                query = container.querySelectorAll(query)
            } else if (query.charAt(0) === '#') {
                query = container.getElementById(query.slice(1))
            } else {
                query = container.getElementsByTagName(query)
            }
        }
        return new Helper(query)
    },

    addClass: function (className) {
        var i = this.length
        var element
        while (i) {
            i -= 1
            element = this[i]
            if (!element.className) {
                element.className = className
                return this
            }
            if (this.hasClass(className)) {
                return this
            }
            element.className += ' ' + className
        }
        return this
    },

    on: function (eventName, handler) {
        var eventNames = eventName.split(/\s+/)
        var i
        var element
        while (eventNames.length) {
            eventName = eventNames.shift()
            i = this.length
            while (i) {
                i -= 1
                element = this[i]
                if (element.addEventListener) {
                    element.addEventListener(eventName, handler, false)
                } else if (element.attachEvent) {
                    element.attachEvent('on' + eventName, handler)
                }
            }
        }
        return this
    },

    first: function () {
        return new Helper(this[0])
    }
})

export  default Helper;