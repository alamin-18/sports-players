const loadData = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=133604')
        .then(res => res.json())
        .then(data => {
            displayData(data);
        })
}
const displayData = (data) => {
    // console.log(data);
    const playerContainer = document.getElementById('player-container');
    playerContainer.innerHTML = '';

    data.player.forEach(p => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'card w-full bg-base-100 shadow-xl';
        playerDiv.innerHTML = `<figure>
    <img
      src="${p?.strThumb}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${p?.strPlayer}</h2>
    <p>Position: ${p?.strPosition}</p>
    <p>Nationality: ${p?.strNationality}</p>
    <p>${p?.strDescriptionEN?.slice(0,100)}</p>
    <div class="card-actions justify-end">
      <label for="my_modal_6" class="btn btn-soft btn-info" onclick="playerDetails('${p?.idPlayer}')">Details</label>
      <button class="btn btn-soft btn-primary">Add Player</button>
    </div>
  </div>
            `;
        playerContainer.appendChild(playerDiv);
    })
}
                      
loadData();
const searchPlayer = () =>{
    const searchInput=document.getElementById('search-input');
    const searchText = searchInput.value.toLowerCase();
    console.log(searchText);
    fetch(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${searchText}`)
    .then(res => res.json())
    .then(data => {
        displayData(data);
    })
}

const playerDetails =(player) => {
    console.log(player);
    
    fetch(`https://www.thesportsdb.com/api/v1/json/123/lookupplayer.php?id=${player}`)
    .then(res => res.json())
    .then(data => {
        const p = data.players?.[0];
        console.log(p);
        const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
     const div = document.createElement('div');
        div.innerHTML =`
        <input type="checkbox" id="my_modal_6" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    <figure>
    <img
      src="${p?.strThumb}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${p?.strPlayer}</h2>
    <p>Position: ${p?.strPosition}</p>
    <p>Nationality: ${p?.strNationality}</p>
    <p>Gender: ${p?.strGender}</p>
    <p>Birth Date: ${p?.dateBorn}</p>
    <p>Birth Place: ${p?.strBirthLocation}</p>
    <p>Height: ${p?.strHeight}</p>
    <p>Weight: ${p?.strWeight}</p>
    <p>Team: ${p?.strTeam}</p>
    <p>Sport: ${p?.strSport}</p>
    <p>${p?.strDescriptionEN?.slice(0,500)}</p>
    
  </div>
    <div class="modal-action">
      <label for="my_modal_6" class="btn">Close!</label>
    </div>
  </div>
</div>
        
        `
        modalContainer.appendChild(div);
        const modal = document.getElementById('my_modal_6');
        modal.checked = true;
        
    })
    

}

