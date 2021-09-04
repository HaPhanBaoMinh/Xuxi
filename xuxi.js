//   XỬ LÝ COMPUTER
// mảng các giá trị 
const VALUES = [
    { id: 'scissors', value: "✌️" }, // [0]
    { id: 'rock', value: "✊" }, // [1]
    { id: 'paper', value: "🖐" },  //[2]
]


const handleChange = () => {
    const i = Math.floor(Math.random() * 3);
    const computer = document.querySelector('#computer');
    computer.textContent = VALUES[i].value; // textContent giống với innerHTML

    computer.dataset.id = VALUES[i].id; // Khi chạy nó sẽ thêm attribute vào thẻ của chúng ta dataset-id=""
}

// Trong js có hỗ trợ chúng ta một hàm lặp đi lặp lại 1 hành động trong một khoảng thời gian nhất định - setInterval
// setInterval(callback, milisecond) return ra một ky giúp ngừng hành động này

let interval = setInterval(handleChange, 100);
// clearInterval(interval) => Ngừng sự lặp lại của hàm interval

// HÀM SO SÁNH KẾT QUẢ TRẢ RA KẾT QUẢ -1 0 1
const compare = (valuePlayer, valueComputer) => {
    const indexUser = VALUES.findIndex(item => item.id === valuePlayer); // nhận index
    const indexComputer = VALUES.findIndex(item => item.id === valueComputer); // nhận index
    let check = indexUser - indexComputer;
    // thắng: check =  1, -2 
    if ([1, -2].includes(check)) {
        return 1;
    } else if (check === 0) {
        return 0;
    } else {
        return -1;
    }
}

// XỬ LÝ uSER
const playerItem = document.querySelectorAll('.user'); // được mảng 3 nút 
// Sựu kiện khi click vào một lựa chọn
playerItem.forEach(item => {
    item.addEventListener("click", event => {
        clearInterval(interval);
        playerItem.forEach(_item => {
            _item.classList.remove('active');// Nếu click sẽ xóa đi 'active' của thẻ dó
            _item.style.pointerEvents = 'none'; // chặn sự kiện click 
        })

        event.target.classList.add('active');// click vào thằng nào thì thằng đó có active
        const playerValue = event.target.id;
        const computerValue = document.querySelector('#computer').dataset.id; // computer.dataset.id = VALUES[i].id;
        let result = compare(playerValue, computerValue);
        console.log(result);
        // Tạo thông báo 
        const newAlert = document.createElement('div');
        newAlert.classList.add('alert');
        let msg = '';
        if (result == 1) {
            msg = 'Bạn thắng, bạn là nhất!';
            newAlert.classList.add('alert-success');

        } else if (result === 0) {
            msg = 'Bạn hòa';
            newAlert.classList.add('alert-warning');
        } else if (result === -1) {
            msg = 'Bạn thua, bạn gà wá!'
            newAlert.classList.add('alert-dark');
        }
        newAlert.textContent = msg;
        const notification = document.querySelector('.notification');
        notification.appendChild(newAlert);
        document.querySelector('#play-again').classList.remove('d-none');
    })
})

// XỬ LÝ BTN CHƠI LẠI
document.querySelector('.btn-play-again').addEventListener('click', event => {
    //1.Bỏ active
    playerItem.forEach(_item => {
        _item.classList.remove('active');// Nếu click sẽ xóa đi 'active' của thẻ dó
        _item.style.pointerEvents = ''
    })
    //2. xóa notification
    document.querySelector('.notification').innerHTML = '';

    //3. chạy lại inteVval
    clearInterval(interval);
    interval = setInterval(handleChange, 100);
})
