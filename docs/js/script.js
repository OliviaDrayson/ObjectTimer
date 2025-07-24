document.getElementById('changeColorBtn').addEventListener('click', function () {
    const container = document.querySelector('.container');
    container.style.backgroundColor = container.style.backgroundColor === '#fff' ? '#f8f8f8' : '#fff';
});
