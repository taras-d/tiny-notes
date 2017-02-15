
(function() {

    var STORAGE_KEY = 'task-list-items';

    window.app = new Vue({
        el: '.app',
        data: {
            items: [],
            activeItem: null
        },
        created: function() {
            this.readFromStorage();
            window.addEventListener('beforeunload', this.saveToStorage);
        },
        methods: {
            readFromStorage: function() {
                try { 
                    this.items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 
                } catch (e) { }
                this.activeItem = this.items[0] || null;
            },
            saveToStorage: function() {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
            },
            add: function() {
                var date = new Date();
                this.items.push({
                    id: date.getTime(),
                    date: new Date(),
                    text: 'new note'
                });
                this.activeItem = this.items[this.items.length - 1];
                setTimeout(function() {
                    var text = this.$refs.text;
                    text.focus();
                    text.select();
                }.bind(this));
            },
            remove: function(event, item, index) {
                event.stopPropagation();
                if (this.activeItem === item) {
                    this.activeItem = null;
                }
                this.items.splice(index, 1);
            },
            canUp: function() {
                var index = this.items.indexOf(this.activeItem),
                    length = this.items.length;
                return (index > 0 && length > 1);
            },
            moveUp: function() {
                var index = this.items.indexOf(this.activeItem);
                if (index > 0) {
                    this.move(index, index - 1);
                }
            },
            canDown: function() {
                var index = this.items.indexOf(this.activeItem),
                    length = this.items.length;
                return (index < length - 1 && length > 1);
            },
            moveDown: function() {
                var index = this.items.indexOf(this.activeItem);
                if (index < this.items.length - 1) {
                    this.move(index, index + 1);
                }
            },
            move: function(from, to) {
                var item = this.items[from];
                this.items.splice(from, 1);
                this.items.splice(to, 0, item);
            }
        }
    });

}());