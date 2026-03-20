// 1. Функція "Діалог з користувачем"
// Використовує: змінні, умовне розгалуження if/else, цикл for, prompt, alert
function dialogWithUser() {
    let score = 0;
    let total = 3;

    let questions = [
        { question: "Who is the older Winchester brother?", answer: "dean" },
        { question: "What is Castiel's species?", answer: "angel" },
        { question: "How many seasons does Supernatural have?", answer: "15" }
    ];

    for (let i = 0; i < questions.length; i++) {
        let userAnswer = prompt("Question " + (i + 1) + " of " + total + ":\n" + questions[i].question);

        if (userAnswer === null) {
            alert("Quiz cancelled.");
            return;
        }

        if (userAnswer.trim().toLowerCase() === questions[i].answer) {
            score++;
        }
    }

    let result;
    if (score === total) {
        result = "Perfect score! You're a true SPN fan!";
    } else if (score >= 1) {
        result = "You got " + score + " out of " + total + ". Not bad, hunter!";
    } else {
        result = "0 out of " + total + ". Time to rewatch the show!";
    }

    alert(result);
}

// 2. Функція виводу інформації про розробника
// Використовує: параметри функції, значення за замовчуванням для параметра "position"
function showDeveloper(surname, name, position = "Student") {
    alert(
        "Page Developer Info\n" +
        "Name: " + name + " " + surname + "\n" +
        "Position: " + position
    );
}

// 3. Функція порівняння двох рядків
// Запитує два рядки через prompt, більший лексикографічно виводить через alert
function compareStrings() {
    let a = prompt("Enter the first string:");
    if (a === null) return;

    let b = prompt("Enter the second string:");
    if (b === null) return;

    if (a > b) {
        alert("The larger string is: \"" + a + "\"");
    } else if (b > a) {
        alert("The larger string is: \"" + b + "\"");
    } else {
        alert("Both strings are equal.");
    }
}


// 4. BOM: об'єкт document - змінює фон сторінки на 30 секунд
function changeBackground() {
    document.body.style.backgroundColor = "#05111f";
    document.body.style.transition = "background-color 1s";
    setTimeout(function () {
        document.body.style.backgroundColor = "";
    }, 30000);
}

// 5. BOM: об'єкт location - перенаправляє браузер на іншу сторінку
function goToPage(url) {
    if (confirm("Navigate to " + url + "?")) {
        location.href = url;
    }
}

// 6. DOM: getElementById + innerHTML
// Оновлює текст підпису таблиці сезонів за його id
function revealEpisodeCount() {
    let caption = document.getElementById("seasons-caption");
    if (caption) {
        caption.innerHTML = "<b>Supernatural: 15 Seasons (2005–2020)</b> <em>- 327 episodes, 15 years of hunting</em>";
    }
}

// 7. DOM: querySelectorAll
// Вибирає всі заголовки h2 на сторінці та застосовує ефект свічення на 5 секунд
function glowHeadings() {
    let headings = document.querySelectorAll("h2");
    headings.forEach(function (h) {
        h.style.textShadow = "0 0 18px #ff2200, 0 0 36px #8B0000";
    });
    setTimeout(function () {
        headings.forEach(function (h) {
            h.style.textShadow = "";
        });
    }, 5000);
}

// 8. DOM: nodeValue / data
// Читає приховані HTML-коментарі всередині кожного <dt> через node.data і показує слабкості істот прямо на сторінці (або ховає їх)
function revealHunterNotes() {
    let dts = document.querySelectorAll('dl dt');
    let alreadyShown = document.querySelectorAll('.weakness-note');

    // якщо нотатки вже показані - ховаємо їх
    if (alreadyShown.length) {
        alreadyShown.forEach(function (note) { note.remove(); });
        return;
    }

    dts.forEach(function (dt) {
        dt.childNodes.forEach(function (node) {
            // nodeType 8 - це вузол-коментар (<!-- ... -->)
            // node.data читає текст з коментаря через nodeValue / data
            if (node.nodeType === 8) {
                let span = document.createElement('span');
                span.className = 'weakness-note';
                span.textContent = node.data.trim();
                span.style.color = '#99ccff';
                span.style.fontSize = '13px';
                span.style.fontStyle = 'italic';
                span.style.marginLeft = '10px';
                dt.appendChild(span);
            }
        });
    });
}

// 9. DOM: outerHTML
// Замінює <dt>Demons</dt> на <h2> - змінює сам тег, а не лише вміст.
// Повторне натискання повертає h2 назад у dt.
function promoteToHeading() {
    let promoted = document.getElementById('demons-promoted');

    if (promoted) {
        // повертаємо h2 назад у dt через outerHTML
        promoted.outerHTML = '<dt>Demons<!-- Weakness: holy water, exorcism ritual, demon-killing knife, the Colt --></dt>';
        return;
    }

    let firstDt = document.querySelector('dl dt');
    if (!firstDt) return;

    // замінюємо <dt> на <h2> - міняється сам тег, не лише текст всередині
    firstDt.outerHTML =
        '<h2 id="demons-promoted" style="color:#ff4444;">' +
        '☠ DEMONS - ULTIMATE THREAT ☠' +
        '</h2>';
}


// 10. createElement + createTextNode + node.after
// Створює новий елемент dd, наповнює текстовим вузлом,
// вставляє після першого dt через node.after().
// Повторне натискання видаляє елемент через node.remove().
function addFieldNote() {
    let existing = document.getElementById("field-note");
    if (existing) {
        existing.remove();          // node.remove()
        return;
    }

    let note = document.createElement("dd");        // document.createElement
    note.id = "field-note";
    let text = document.createTextNode(             // document.createTextNode
        "Field note by Sam Winchester: confirmed hostile - do NOT engage without backup."
    );
    note.appendChild(text);
    note.style.color = "#99ccff";
    note.style.fontStyle = "italic";

    let firstDt = document.querySelector("dl dt");
    if (firstDt) firstDt.after(note);              // node.after
}

// 11. node.prepend
// Додає заголовок-попередження на початок списку бестіарію через node.prepend()
function prependThreatAlert() {
    let dl = document.querySelector("dl");
    if (!dl) return;

    let existing = document.getElementById("threat-alert");
    if (existing) {
        existing.remove();
        return;
    }

    let dt = document.createElement("dt");
    dt.id = "threat-alert";
    dt.textContent = "ACTIVE THREAT ALERT - all entries below are confirmed hostile";
    dt.style.color = "#ff4444";
    dt.style.backgroundColor = "#1a0000";

    dl.prepend(dt);                                 // node.prepend
}

// 12. node.append
// Додає посилання на архів в кінець списку бестіарію через node.append()
function appendArchiveCitation() {
    let dl = document.querySelector("dl");
    if (!dl) return;

    let existing = document.getElementById("archive-citation");
    if (existing) {
        existing.remove();
        return;
    }

    let dd = document.createElement("dd");
    dd.id = "archive-citation";
    dd.textContent = "Source: Winchester Family Bestiary, Men of Letters Archives, Vol. III.";
    dd.style.color = "#888888";
    dd.style.fontStyle = "italic";

    dl.append(dd);                                  // node.append
}

// 13. node.replaceWith
// Замінює dt останньої істоти на оновлений запис через node.replaceWith()
function replaceLastEntry() {
    let dts = document.querySelectorAll("dl dt:not([id])");
    if (!dts.length) return;

    let last = dts[dts.length - 1];

    // якщо вже замінено - повертаємо назад
    if (last.dataset.replaced) {
        last.textContent = last.dataset.original;
        last.style.color = "";
        delete last.dataset.replaced;
        delete last.dataset.original;
        return;
    }

    let original = last.textContent;
    let replacement = document.createElement("dt");
    replacement.textContent = original + " [Entry updated - threat level revised]";
    replacement.style.color = "#ffcc00";
    replacement.dataset.replaced = "true";
    replacement.dataset.original = original;

    last.replaceWith(replacement);                     // node.replaceWith
}