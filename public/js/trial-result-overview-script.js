function showPopup() {
	document.getElementById("popup").style.display = "block";
	// Di sini kamu bisa menambahkan logika untuk mengambil catatan sidang dan nilai sidang dari database atau sumber lainnya
	// Contoh:
	let catatanSidang = "Catatan sidang mahasiswa...";
	let nilaiSidang = "Nilai sidang mahasiswa...";
	document.getElementById("catatanSidang").innerHTML = catatanSidang;
	document.getElementById("nilaiSidang").innerHTML = nilaiSidang;
}

function closePopup() {
	document.getElementById("popup").style.display = "none";
}
