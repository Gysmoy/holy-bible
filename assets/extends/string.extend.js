/**
 * Crea un objeto a partir de una cadena de texto que coincide con una expresión
 * regular y una estructura de propiedades.
 *
 * @param {RegExp} regex - La expresión regular para buscar en la cadena de texto.
 * @param {string} structure - Una cadena de texto con la estructura de propiedades
 * del objeto separadas por comas.
 * @returns {Object|null} - Un objeto con las propiedades especificadas en la
 * estructura o null si no se encuentra una coincidencia.
 */
String.prototype.matchAndCreateObject = function (regex, structure) {
    try {
        let matched = this.match(regex);
        let object = {};

        structure.split(",").forEach((s, i) => {
            object[s.trim()] = matched[i + 1].trim();
        });

        return object;
    } catch (error) {
        return null;
    }
}

/**
 * Divide una cadena de texto en un arreglo y opcionalmente crea objetos a partir
 * de cada elemento utilizando una expresión regular y una estructura de propiedades.
 *
 * @param {string} separator - El separador utilizado para dividir la cadena de
 * texto en un arreglo.
 * @param {object} [options] - Un objeto con opciones adicionales.
 * @param {RegExp} [options.regex] - La expresión regular utilizada para crear un
 * objeto a partir de cada elemento.
 * @param {string} [options.structure] - Una cadena de texto con la estructura de
 * propiedades de cada objeto separadas por comas.
 * @returns {Array} - Un arreglo con los elementos de la cadena de texto y, si se
 * especifica la opción "regex", objetos creados a partir de cada elemento.
 */
String.prototype.split2 = function (separator, { regex, structure } = {}) {
    let array = this.split(separator);

    return array
        .map(e => {
            if (!regex) {
                return e.trim();
            } else {
                return e.trim().matchAndCreateObject(regex, structure);
            }
        })
        .filter(Boolean);
};

/**
 * Convierte una cadena de texto en formato CSV en un arreglo de objetos JSON.
 *
 * @param {string} [separator=','] - El separador utilizado para separar los campos
 * de la fila.
 * @param {number} [headers_pos=0] - La posición de la fila que contiene los
 * encabezados de las columnas.
 * @returns {Array} - Un arreglo de objetos JSON con los datos del archivo CSV.
 */
String.prototype.csvToJson = function (separator = ',', headers_pos = 0) {
    let csv = this.toString();
    const lines = csv.trim().split("\n");
    const headers = lines[headers_pos].split(separator);
    const result = [];
    for (let i = (headers_pos + 1); i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(separator);
        let cursor = 0;
        if (!currentLine.every(c => c === "")) { // Validar si la fila está vacía
            for (let j = 0; j < headers.length; j++) {
                if (currentLine[cursor].startsWith('"')) {
                    let field = currentLine[cursor].substring(1);

                    while (!currentLine[cursor].endsWith('"')) {
                        cursor++;
                        field += `${separator}${currentLine[cursor]}`;
                    }
                    obj[headers[j]] = field.slice(0, -1);
                } else {
                    obj[headers[j]] = currentLine[cursor];
                }
                cursor++;
            }
            result.push(obj);
        }
    }
    return result;
}

/**
 * Capitaliza la primera letra de cada palabra de una cadena y deja en mayúscula las
 * palabras que estén separadas por un punto.
 *
 * @param {Boolean} [capitalizeSingleWords=true] - Si es verdadero, las palabras con
 * una sola letra también se capitalizarán, de lo contrario, se mantendrán en minúsculas.
 * @returns {string} Cadena con la primera letra de cada palabra en mayúscula y el resto
 * en minúscula.
 */
String.prototype.toTitleCase = function (capitalizeSingleWords = true) {
    let text = this.toString();
    let lastChar = text.slice(-1);
    if (lastChar === " ") return text;
    text = text.replace(/\b\w/g, l => l.toUpperCase());
    let words = text.split(" ");
    let result = "";
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.includes(".")) {
            result += word + " ";
        } else {
            let capitalize = capitalizeSingleWords || word.length > 1;
            if (capitalize) {
                result += word.charAt(0) + word.slice(1).toLowerCase() + " ";
            } else {
                result += word.toLowerCase() + " ";
            }
        }
    }
    return result.trim();
}

/**
 * Convierte una cadena de texto en un objeto JSON si es posible.
 * 
 * @returns {Object|false} Devuelve el objeto JSON si la cadena de texto es parseable
 * como JSON, o devuelve false si no lo es.
 */
String.prototype.parseable = function () {
    let text = this.toString();
    try {
        let json = JSON.parse(text);
        return json;
    } catch (error) {
        return false;
    }
}

/**
 * Comprueba si la cadena de texto actual y la cadena de texto proporcionada se contienen
 * mutuamente.
 *
 * @param {string} text - La cadena de texto a comprobar si se contiene mutuamente con la
 * cadena de texto actual.
 * @returns {boolean} Devuelve true si la cadena de texto actual y la cadena de texto
 * proporcionada se contienen mutuamente, de lo contrario devuelve false.
 */
String.prototype.includesEachOther = function (text) {
    let text1 = this.toString().toLowerCase();
    let text2 = text.toLowerCase();
    return text1.includes(text2) || text2.includes(text1);
};

/**
 * Retorna una nueva cadena con los caracteres especiales y acentos reemplazados por sus
 * versiones sin acentos, y eliminando los caracteres no alfanuméricos. Los espacios
 * múltiples son reemplazados por un solo espacio.
 * 
 * @param {string} [sep=' '] - El separador que se usará para unir los elementos de la
 * cadena resultante. Por defecto, es un espacio en blanco.
 * @returns {string} Una nueva cadena sin caracteres especiales ni acentos, y sin caracteres
 * no alfanuméricos, con los espacios múltiples reemplazados por un solo espacio.
 */
String.prototype.clean = function (sep = ' ') {
    let text = this.toString();

    let especial_chars = [
        "Ã", "À", "Á", "Ä", "Â",
        "Ẽ", "È", "É", "Ë", "Ê",
        "Ĩ", "Ì", "Í", "Ï", "Î",
        "Õ", "Ò", "Ó", "Ö", "Ô",
        "Ũ", "Ù", "Ú", "Ü", "Û",
        "Ñ", "Ç"
    ];
    let normal_chars = [
        "A", "A", "A", "A", "A",
        "E", "E", "E", "E", "E",
        "I", "I", "I", "I", "I",
        "O", "O", "O", "O", "O",
        "U", "U", "U", "U", "U",
        "N", "C"
    ];
    text = text.toUpperCase();
    text = text.replace(/[^A-Z0-9 ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÑÇ]/gi, '');
    for (let i = 0; i < especial_chars.length; i++) {
        text = text.replaceAll(especial_chars[i], normal_chars[i]);
    }
    let clean = text.split(' ').filter(Boolean).join(sep);
    return clean;

}

/**
 * Retorna una cadena de texto con sólo caracteres alfanuméricos y espacios.
 * 
 * @param {boolean} [latin=true] - Indica si se deben incluir caracteres latinos
 * extendidos (e.g. Ññ) o no.
 * @returns {string} Cadena de texto con sólo caracteres alfanuméricos y espacios.
 */
String.prototype.getAlNum = function (latin = true) {
    let regex = new RegExp('[^a-zA-Z0-9Ññ\\s]', 'g');
    if (!latin) regex = new RegExp('[^a-zA-Z0-9\\s]', 'g');

    return this.toString()
        .replace(regex, '')
        .split(' ')
        .filter(Boolean)
        .join(' ');
};

/**
 * Elimina todos los caracteres de una cadena de texto excepto aquellos especificados.
 * @param {string} characters - Los caracteres que se quieren mantener en la cadena de texto.
 * @returns {string} La cadena de texto con solo los caracteres especificados.
 */
String.prototype.keep = function (characters) {
    const regex = new RegExp(`[^${characters}]`, 'g');
    return this.toString()
        .replace(regex, '')
        .split(' ')
        .filter(Boolean)
        .join(' ');
};

/**
 * La función `String.prototype.reduce` es un método personalizado agregado al prototipo
 * `String` en JavaScript. Toma un solo parámetro `chars`, que es el número máximo de caracteres
 * a los que debe reducirse la cadena.
*/
String.prototype.reduce = function (chars) {
    let text = this.toString();
    if (text.length > chars) {
        text = text.slice(0, chars - 3) + "...";
    }
    return text;
}

/**
 * Calcula la similitud entre dos cadenas de texto comparando sus palabras.
 * 
 * @param {string} compareWith - La cadena con la que comparar.
 * @param {number} [chars=3] - El número mínimo de caracteres que una palabra debe tener
 * para ser considerada en la comparación.
 * @returns {object} Un objeto que contiene información sobre la comparación entre las
 * dos cadenas.
 */
String.prototype.compare = function (compareWith, chars = 3) {
    // let text1 = this.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // let text2 = compareWith.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let text1 = this.clean();
    let text2 = compareWith.clean();

    let words1 = text1.split(/\W+/);
    let words2 = text2.split(/\W+/);

    let matches = [];
    let raw1_array = this.toString().split(' ').filter(Boolean);
    let raw2_array = compareWith.toString().split(' ').filter(Boolean);
    let coincidences1_array = [];
    let coincidences2_array = [];
    for (let i = 0; i < words1.length; i++) {
        for (let j = 0; j < words2.length; j++) {
            let word1 = words1[i].replace(/[\u0300-\u036f]/g, "");
            let word2 = words2[j].replace(/[\u0300-\u036f]/g, "");
            if (word1 === word2) {
                matches.push(word1);
                coincidences1_array.push(word1);
                coincidences2_array.push(word2);
                break;
            } else if (
                (word1.length >= chars && word2.includes(word1)) ||
                (word2.length >= chars && word1.includes(word2))
            ) {
                coincidences1_array.push(word1);
                coincidences2_array.push(word2);
            }
        }
    }

    let similarity = matches.length / (words1.length + words2.length - matches.length);

    return {
        "in": {
            "original": this.toString(),
            "comparer": compareWith.toString()
        },
        "out": {
            "original": raw1_array.map((str) => {
                if (coincidences1_array.find(x => str.clean() == x.clean()))
                    return `<strong>${str}</strong>`;
                else
                    return str;
            }).join(' '),
            "comparer": raw2_array.map((str) => {
                if (coincidences2_array.find(x => str.clean() == x.clean()))
                    return `<strong>${str}</strong>`;
                else
                    return str;
            }).join(' ')
        },
        "accuracy": {
            "atLeastOne": matches.length > 0,
            "permissive": similarity > 0.25,
            "moderate": similarity > 0.5,
            "strict": similarity > 0.75,
            "exact": similarity === 1
        },
        "coincidences": matches.length,
        "percent": similarity
    };
};

String.prototype.permutate = function (separator = " ") {
    let text = this.toString()
    const words = text.split(separator);
    const permutations = [];

    function generatePermutations(startIndex, currentPermutation) {
        if (startIndex === words.length) {
            permutations.push(currentPermutation.join(separator));
            return;
        }

        for (let i = startIndex; i < words.length; i++) {
            const combination = words.slice(startIndex, i + 1);
            permutations.push(combination.join(separator));
            generatePermutations(i + 1, [...currentPermutation, ...combination]);
        }
    }

    generatePermutations(0, []);

    return [...new Set(permutations)];
}
