    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let desenhando = false;
    let cor = document.getElementById("color").value;
    let tamanho = document.getElementById("size").value;

    canvas.addEventListener("mousedown", () => { desenhando = true; });
    canvas.addEventListener("mouseup", () => { desenhando = false; ctx.beginPath(); });
    canvas.addEventListener("mousemove", desenhar);

    document.getElementById("color").oninput = e => cor = e.target.value;
    document.getElementById("size").oninput = e => tamanho = e.target.value;

    function desenhar(e) {
        if (!desenhando) return;

        ctx.lineWidth = tamanho;
        ctx.lineCap = "round";
        ctx.strokeStyle = cor;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    document.getElementById("clear").onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
