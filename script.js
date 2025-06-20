
let mode = "light";
let totalTransaksi = 0;
let totalPendapatan = 0;
let diskon = 0;

document.getElementById("toggleMode").addEventListener("click", () => {
  mode = mode === "light" ? "dark" : "light";
  document.body.className = mode;
});

document.getElementById("terapkanPromo").addEventListener("click", () => {
  const promo = document.getElementById("promo").value.trim().toUpperCase();
  if (promo === "DISKON10") {
    diskon = 0.1;
    alert("Kode promo diterapkan! Diskon 10%");
  } else {
    diskon = 0;
    alert("Kode promo tidak valid.");
  }
  updateTotal();
});

document.getElementById("produk").addEventListener("change", updateTotal);
document.getElementById("jumlah").addEventListener("input", updateTotal);

function updateTotal() {
  const produk = document.getElementById("produk");
  const harga = parseInt(produk.selectedOptions[0].dataset.harga || "0");
  const jumlah = parseInt(document.getElementById("jumlah").value || "1");
  const subtotal = harga * jumlah;
  const total = subtotal - subtotal * diskon;
  document.getElementById("subtotal").innerText = "Subtotal: Rp " + subtotal.toLocaleString();
  document.getElementById("total").innerText = "Total: Rp " + total.toLocaleString();
}

document.getElementById("formPembayaran").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const produkEl = document.getElementById("produk");
  const produk = produkEl.value;
  const harga = parseInt(produkEl.selectedOptions[0].dataset.harga || "0");
  const jumlah = parseInt(document.getElementById("jumlah").value || "1");
  const metode = document.querySelector("input[name='metode']:checked").value;
  const total = harga * jumlah * (1 - diskon);

  if (!produk || harga === 0) return alert("Pilih layanan terlebih dahulu.");

  totalTransaksi++;
  totalPendapatan += total;

  document.getElementById("totalTransaksi").innerText = totalTransaksi;
  document.getElementById("totalPendapatan").innerText = "Rp " + totalPendapatan.toLocaleString();
  document.getElementById("rataRata").innerText = "Rp " + Math.round(totalPendapatan / totalTransaksi).toLocaleString();

  const list = document.getElementById("riwayatList");
  if (totalTransaksi === 1) list.innerHTML = "";
  const item = document.createElement("div");
  item.innerHTML = `<strong>${nama}</strong> pesan <strong>${jumlah}x ${produk}</strong> via <em>${metode}</em> - <span class='text-green-700'>Rp ${total.toLocaleString()}</span>`;
  list.prepend(item);

  Swal.fire({
    icon: "success",
    title: "Pembayaran Berhasil",
    html: `
      <p>Nama: <strong>${nama}</strong></p>
      <p>Produk: ${jumlah}x ${produk}</p>
      <p>Total: <strong>Rp ${total.toLocaleString()}</strong></p>
      <p>Metode: ${metode}</p>
    `,
    confirmButtonColor: '#f97316'
  });

  this.reset();
  diskon = 0;
  updateTotal();
});
