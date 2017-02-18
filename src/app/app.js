export default {

    name: 'app',

    data() {
        return {
            items: [],
            activeItem: null
        }
    },

    created() {
        this.readFromStorage();
        window.addEventListener('beforeunload', this.saveToStorage);
    },

    methods: {

        readFromStorage: function() {

            try { 
                this.items = JSON.parse(localStorage.getItem('tiny-notes')) || []; 
            } catch (e) { }

            this.activeItem = this.items[0] || null;
        },

        saveToStorage: function() {
            window.localStorage.setItem('tiny-notes', JSON.stringify(this.items));
        },

        add() {

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

        remove(event, item, index) {

            event.stopPropagation();

            if (this.activeItem === item) {
                this.activeItem = null;
            }
            this.items.splice(index, 1);
        },

        canUp() {
            var index = this.items.indexOf(this.activeItem),
                length = this.items.length;
            return (index > 0 && length > 1);
        },

        moveUp() {
            var index = this.items.indexOf(this.activeItem);
            if (index > 0) {
                this.move(index, index - 1);
            }
        },

        canDown() {
            var index = this.items.indexOf(this.activeItem),
                length = this.items.length;
            return (index < length - 1 && length > 1);
        },

        moveDown() {
            var index = this.items.indexOf(this.activeItem);
            if (index < this.items.length - 1) {
                this.move(index, index + 1);
            }
        },

        move(from, to) {
            var item = this.items[from];
            this.items.splice(from, 1);
            this.items.splice(to, 0, item);
        }
    }
}