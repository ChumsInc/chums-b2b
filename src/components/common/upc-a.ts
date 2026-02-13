export default class UPCA {
    static CHUMS = '000298';
    static raw (upc:string) {
        const re = /[0-9]/;
        return upc.split('')
            .filter(c => re.test(c))
            .join('');
    }

    static format(upc:string) {
        let _upc = UPCA.raw(upc);

        if (_upc.length === 5) {
            _upc = UPCA.CHUMS + _upc;
        }

        if (_upc.length !== 11 && _upc.length !== 12) {
            return _upc;
        }
        const [, p1, p2, p3] = /(\d)(\d{5})(\d{5})(\d)/.exec(_upc) ?? [];
        return [p1, p2, p3, UPCA.checkdigit(_upc)].join(' ');
    }

    static checkdigit(upc:string) {
        let _upc = UPCA.raw(upc.trim()).slice(0, 11);

        if (_upc.length === 5) {
            _upc = UPCA.CHUMS + _upc;
        }

        if (_upc.length !== 11) {
            return _upc;
        }
        const cd = {
            even: 0,
            odd: 0
        };
        _upc.split('').forEach((c, index) => {
            const parsed = parseInt(c, 10);
            if (index % 2 === 0) {
                cd.even += parsed;
            } else {
                cd.odd += parsed;
            }
        });
        cd.even *= 3;
        return (10 - (cd.odd + cd.even) % 10) % 10;
    }
}
