function roulette(params) {

    const obj = {}
    const container = document.getElementById(params.container);

    function animate(target, position) {
        obj.items[target].style.bottom = `-${position * 100}%`;
    }

    function getNumbersReverse(value) {
        const numbers = (String(value).split('')).reverse();
        for (let i = 0; i < numbers.length; i++) {
            numbers[i] = Number(numbers[i])
        }
        return numbers;
    }

    function getStructure(value) {
        const itens = [];
        const numbers = getNumbersReverse(value);
        for (let i = 0; i < numbers.length; i++) {
            if (i % 3 == 0 && i != 0 && params.separator) {
                itens.push(params.separator)
            }
            itens.push(numbers[i])
        }
        return itens.reverse();
    }

    function getWheelItem() {
        let spanItens = '';
        for (let n = 10; n >= 0; n--) {
            spanItens += `<span>${n==10?0:n}</span>`;
        }
        return `<div class="item"><div class="number animation">${spanItens}</div></div>`;
    }

    function render(value) {

        let innerHTML = '';
        const structure = getStructure(value)
        const separator = `<div class="separator">${params.separator}</div>`;
        for (let i = 0; i < structure.length; i++) {
            innerHTML += structure[i] === params.separator ? separator : getWheelItem();
        }

        container.innerHTML = innerHTML;
    }

    function resetPosition(target) {
        if (target <= 0) {
            return;
        }
        setTimeout(() => {
            obj.items[target].classList.remove('animation');
            animate(target, 0);
            obj.values[target] = 0;
            setTimeout(() => {
                obj.items[target].classList.add('animation');
            }, 100);
        }, 200);
    }

    function counterControl(target, position) {

        if (position >= 10) {
            resetPosition(target)
            counter(target - 1)
        }

        animate(target, position)
        obj.values[target] = position;

    }

    function counter(target) {
        if (target >= 0) {
            counterControl(target, obj.values[target] + 1);
        }

        if (target != obj.last) {
            return;
        }

        obj.counter++;

        if (obj.totalChars == String(obj.counter).length) {
            setTimeout(() => {
                counter(obj.last)
            }, params.timer);

            return;
        }

        setTimeout(() => {
            reset(obj.counter);
        }, 150);


    }

    function start() {

        for (let i = 0; i < obj.items.length; i++) {

            setTimeout(() => {
                animate(i, obj.values[i])
            }, 100 * i);
        }

        setTimeout(() => {
            counter(obj.last)
        }, params.timer);

    }

    function reset(value) {

        /**
         * Renderizar elementos
         */

        render(value);

        obj.counter = value;
        obj.values = (String(value)).split('');

        obj.values.map((v, i) => {
            obj.values[i] = Number(v)
        });



        obj.last = obj.values.length - 1;
        obj.unit = obj.values[obj.last];
        obj.totalChars = String(obj.counter).length;
        obj.items = container.getElementsByClassName('number');

        /**
         * Setar valor inicial e iniciar a contagem
         */

        start();

    }

    reset(params.value);

}

roulette({
    container: 'roulette',
    value: 99998,
    separator: '.',
    timer: 1000,
})