let izbrisiBrojke = document.getElementById("dugme-brojke");
let izbrisiBrosonja = document.getElementById("dugme-brosonja");
let izbrisiDebroljko = document.getElementById("dugme-debroljko");
let imeUneseno = document.getElementById("ime");
let datum = document.getElementById("datum");
let vreme = document.getElementById("vreme");
let unesiDugme = document.getElementById("unesi");

unesiDugme.addEventListener("click", () => {
  if (
    imeUneseno.value != "Brojke" &&
    imeUneseno.value != "Brosonja" &&
    imeUneseno.value != "Debroljko"
  ) {
    alert("Ime mora biti Bro Komerc approved");
  }
});

izbrisiBrojke.addEventListener("click", () => {
  axios.post("/remove-item-brojke").then(() => {
    window.location.reload();
  });
});
izbrisiBrosonja.addEventListener("click", () => {
  axios.post("/remove-item-brosonja").then(() => {
    window.location.reload();
  });
});
izbrisiDebroljko.addEventListener("click", () => {
  axios.post("/remove-item-debroljko").then(() => {
    window.location.reload();
  });
});
