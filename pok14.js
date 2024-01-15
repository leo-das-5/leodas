const a = document.getElementById("ti");
const b = document.getElementById("result");
function tree()
{
    const f = document.getElementById("s").value;
    const r = f*450;
    b.value = r;

}
a.addEventListener("click",tree);