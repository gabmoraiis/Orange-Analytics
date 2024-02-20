
let playerPageUrl = 'https://www.balldontlie.io/api/v1/players/';
let teamPageUrl = 'https://www.balldontlie.io/api/v1/teams/';
let gamesPageUrl = 'https://www.balldontlie.io/api/v1/games?start_date=';
let seasonAveragesPageUrl = 'https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=';
const cardBox = document.getElementById('card-box');

window.onload = async () => {
    try {
        await loadCardsInfo(cardPlayerSelection());
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards.');
    }
}

async function loadCardsInfo(playerID) {

    const response1 = await callAPI(playerPageUrl, playerID);

    const response2 = await callAPI(teamPageUrl, response1.team.id);

    const response3 = await callAPI2(gamesPageUrl, cardGamesStartDate(), cardGamesEndDate(), response1.team.id);

    const response4 = await callAPI(seasonAveragesPageUrl, playerID);

    const card1 = document.createElement('div');
    card1.className = "card1";
    card1.setAttribute("data-aos", "fade-up-right")

    const card1Data1 = document.createElement('p');
    const playerName = document.createElement('span');
    playerName.className = "title";
    playerName.innerHTML = 'Nome:';
    const playerNameAsnwer = document.createElement('span');
    playerNameAsnwer.className = "asnwer";
    playerNameAsnwer.innerHTML = `${response1.first_name} ${response1.last_name}`;

    const card1Data2 = document.createElement('p');
    const playerHeight = document.createElement('span');
    playerHeight.className = "title";
    playerHeight.innerHTML = 'Altura:';
    const playerHeightAsnwer = document.createElement('span');
    playerHeightAsnwer.className = "asnwer";
    playerHeightAsnwer.innerHTML = `${heightConversion(response1.height_feet, response1.height_inches)}`;

    const card1Data3 = document.createElement('p');
    const playerTeam = document.createElement('span');
    playerTeam.className = "title";
    playerTeam.innerHTML = 'Equipe:';
    const playerTeamAsnwer = document.createElement('span');
    playerTeamAsnwer.className = "asnwer";
    playerTeamAsnwer.innerHTML = `${response1.team.full_name}`;

    const card1Data4 = document.createElement('p');
    const playerPoints = document.createElement('span');
    playerPoints.className = "title";
    playerPoints.innerHTML = 'Pontos na Temporada:';
    const playerPointsAsnwer = document.createElement('span');
    playerPointsAsnwer.className = "asnwer";
    playerPointsAsnwer.innerHTML = `${(response4.data[0].pts).toFixed(1)} PPG`;

    const card1Data5 = document.createElement('p');
    const playerAssists = document.createElement('span');
    playerAssists.className = "title";
    playerAssists.innerHTML = 'Assistências na Temporada:';
    const playerAssistsAsnwer = document.createElement('span');
    playerAssistsAsnwer.className = "asnwer";
    playerAssistsAsnwer.innerHTML = `${(response4.data[0].ast).toFixed(1)} APG`;

    const card1Data6 = document.createElement('p');
    const playerRebounds = document.createElement('span');
    playerRebounds.className = "title";
    playerRebounds.innerHTML = 'Rebotes na Temporada:';
    const playerReboundsAsnwer = document.createElement('span');
    playerReboundsAsnwer.className = "asnwer";
    playerReboundsAsnwer.innerHTML = `${(response4.data[0].reb).toFixed(1)} RPG`;

    const card2 = document.createElement('div');
    card2.className = "card2"
    card2.setAttribute("data-aos", "fade-up")
    const card2LogoBox = document.createElement('div');
    card2LogoBox.className = "card2-logo-box";
    const card2Datas = document.createElement('div');
    card2Datas.className = "card2-datas";

    const card2Logo = document.createElement('img');
    card2Logo.className = "card2-logo";
    card2Logo.alt = `${response1.team.full_name}`
    card2Logo.src = `./assets/${response1.team.full_name.replace(/ /g, "-")}-logo.png`;

    const card2Data1 = document.createElement('p');
    const teamName = document.createElement('span');
    teamName.className = "title";
    teamName.innerHTML = 'Nome:';
    const teamNameAsnwer = document.createElement('span');
    teamNameAsnwer.className = "asnwer";
    teamNameAsnwer.innerHTML = `${response1.team.full_name}`;

    const card2Data2 = document.createElement('p');
    const teamAbrev = document.createElement('span');
    teamAbrev.className = "title";
    teamAbrev.innerHTML = 'Sigla:';
    const teamAbrevAsnwer = document.createElement('span');
    teamAbrevAsnwer.className = "asnwer";
    teamAbrevAsnwer.innerHTML = `${response2.abbreviation}`;

    const card2Data3 = document.createElement('p');
    const teamCity = document.createElement('span');
    teamCity.className = "title";
    teamCity.innerHTML = 'Cidade:';
    const teamCityAsnwer = document.createElement('span');
    teamCityAsnwer.className = "asnwer";
    teamCityAsnwer.innerHTML = `${cityNameCorrection(response2.city)}`;

    const card2Data4 = document.createElement('p');
    const teamConference = document.createElement('span');
    teamConference.className = "title";
    teamConference.innerHTML = 'Conferência:';
    const teamConferenceAsnwer = document.createElement('span');
    teamConferenceAsnwer.className = "asnwer";
    teamConferenceAsnwer.innerHTML = `${conferenceTraduction(response2.conference)}`;


    const card3 = document.createElement('div');
    card3.className = "card3";
    card3.setAttribute("data-aos", "fade-up-left")

    const card3TitleBox = document.createElement('div');
    card3TitleBox.className = "card3-title-box";

    const card3Datas = document.createElement('div');
    card3Datas.className = "card3-datas";

    const card3Title = document.createElement('span');
    card3Title.className = "card3-title";
    card3Title.innerHTML = `Próximos jogos do ${response1.team.full_name}`;

    response3.data.sort((a, b) => { return a.id - b.id });

    response3.data.forEach((game) => {

        const card3Data1 = document.createElement('p');

        const visitorLogo = document.createElement('img');
        visitorLogo.className = "team-logo";
        visitorLogo.alt = game.visitor_team.full_name;
        visitorLogo.src = `./assets/${game.visitor_team.full_name.replace(/ /g, "-")}-logo.png`;

        if (cardGamesGameHour(game.status) == 'Hoje - Finalizado') {
            const gameTeams = document.createElement('span');
            gameTeams.className = "teams-abrev";
            gameTeams.innerHTML = `${game.visitor_team.abbreviation} ${game.visitor_team_score} X ${game.home_team_score} ${game.home_team.abbreviation}`;
        } else {
            const gameTeams = document.createElement('span');
            gameTeams.className = "teams-abrev";
            gameTeams.innerHTML = `${game.visitor_team.abbreviation} X ${game.home_team.abbreviation} `;
        }
        const gameTeams = document.createElement('span');
        gameTeams.className = "teams-abrev";
        gameTeams.innerHTML = `${game.visitor_team.abbreviation} X ${game.home_team.abbreviation} `;

        const homeLogo = document.createElement('img');
        homeLogo.className = "team-logo";
        homeLogo.alt = game.home_team.full_name;
        homeLogo.src = `./assets/${game.home_team.full_name.replace(/ /g, "-")}-logo.png`;

        const dateHour = document.createElement('span');
        dateHour.className = "data-e-hora";
        dateHour.innerHTML = `${game.date.slice(8, 10)}/${game.date.slice(5, 7)}/${game.date.slice(0, 4)} ${cardGamesGameHour(game.status)}`;

        card3Data1.appendChild(visitorLogo); card3Data1.appendChild(gameTeams); card3Data1.appendChild(homeLogo); card3Data1.appendChild(dateHour);
        card3Datas.appendChild(card3Data1);
    })
    card1Data1.appendChild(playerName); card1Data1.appendChild(playerNameAsnwer);
    card1Data2.appendChild(playerHeight); card1Data2.appendChild(playerHeightAsnwer);
    card1Data3.appendChild(playerTeam); card1Data3.appendChild(playerTeamAsnwer);
    card1Data4.appendChild(playerPoints); card1Data4.appendChild(playerPointsAsnwer);
    card1Data5.appendChild(playerAssists); card1Data5.appendChild(playerAssistsAsnwer);
    card1Data6.appendChild(playerRebounds); card1Data6.appendChild(playerReboundsAsnwer);

    card1.appendChild(card1Data1); card1.appendChild(card1Data2);
    card1.appendChild(card1Data3); card1.appendChild(card1Data4);
    card1.appendChild(card1Data5); card1.appendChild(card1Data6);

    card2Data1.appendChild(teamName); card2Data1.appendChild(teamNameAsnwer);
    card2Data2.appendChild(teamAbrev); card2Data2.appendChild(teamAbrevAsnwer);
    card2Data3.appendChild(teamCity); card2Data3.appendChild(teamCityAsnwer);
    card2Data4.appendChild(teamConference); card2Data4.appendChild(teamConferenceAsnwer);

    card2LogoBox.appendChild(card2Logo);

    card2Datas.appendChild(card2Data1); card2Datas.appendChild(card2Data2); card2Datas.appendChild(card2Data3); card2Datas.appendChild(card2Data4);

    card2.appendChild(card2LogoBox); card2.appendChild(card2Datas);

    card3TitleBox.appendChild(card3Title);

    card3.appendChild(card3TitleBox); card3.appendChild(card3Datas);

    cardBox.appendChild(card1); cardBox.appendChild(card2); cardBox.appendChild(card3);
}

async function callAPI(url, param1) {
    return await (await fetch(url + param1)).json();
}

async function callAPI2(url, param1, param2, param3) {
    return await (await fetch(url + param1 + param2 + param3)).json();
}
function heightConversion(heightFeet, heightInches) {
    if (heightFeet === null || heightInches === null) {
        return "Dado Indisponível"
    } else {
        heightFeet = heightFeet * 30.48;
        heightInches = heightInches * 2.54;
        let centimeterHeight = ((heightFeet + heightInches) / 100).toFixed(2);
        return `${centimeterHeight}m`;
    }
}

function cardPlayerSelection() {
    const mainPlayers = ['237', '274', '79', '15', '175', '246', '132', '115', '140', '458', '666786', '3547238', '227', '161', '182', '56677822', '297', '490', '434', '3547239', '125', '322',
        '17896075', '3547245', '61', '73', '38017683', '145', '17896055', '265'];
    let randomIndex = Math.floor(Math.random() * mainPlayers.length);
    return mainPlayers[randomIndex];
}

function cardGamesStartDate() {
    let data = new Date();
    let date = data.getDate().toString().length > 1 ? data.getDate() : '0' + data.getDate();
    let month = data.getMonth().toString().length > 1 ? data.getMonth() + 1 : '0' + (data.getMonth() + 1);
    let year = data.getFullYear();
    let formatedDate = `${year}-${month}-${date}&`;
    return formatedDate;
}

function cardGamesGameHour(gameHour) {
    let hora = parseInt(gameHour.slice(11, 13));
    let minutos = gameHour.slice(14, 16);

    if (gameHour.length == 20) {
        if (hora - 3 < 0) {
            return `às ${(hora - 3) + 24}:${minutos} BRT`;
        } else if (hora < 10) {
            return `às 0${(hora - 3)}:${minutos} BRT`;
        } else if (gameHour == 'Final') {
            return 'Hoje - Finalizado';
        } else {
            return `às ${hora - 3}:${minutos} BRT`;
        }
    } else {
        return `no ${gameHour}`;
    }
}

function cardGamesEndDate() {
    let data = new Date();
    let month = data.getMonth().toString().length > 1 ? data.getMonth() + 1 : '0' + (data.getMonth() + 1);
    let monthJump = data.getMonth().toString().length > 1 ? data.getMonth() + 2 : '0' + (data.getMonth() + 2);
    let year = data.getFullYear();

    if ((year % 4 == 0 && year % 100 !== 0) || (year % 400 == 0)) {
        if (data.getDate() + 7 >= 32) {
            switch (data.getMonth()) {
                case 0:
                case 2:
                case 4:
                case 6:
                case 7:
                case 9:
                case 11:
                    date = (data.getDate() + 7) - 31;
                    break;
                case 3:
                case 5:
                case 8:
                case 10:
                    date = (data.getDate() + 7) - 30;
                    break;
                case 1:
                    date = (data.getDate() + 7) - 29;
                    break;
            }
            date = date.toString().length > 1 ? date : '0' + date;
            let formatedDate = `end_date=${year}-${monthJump}-${date}&team_ids[]=`;
            return formatedDate;
        } else { return `end_date=${year}-${month}-${data.getDate() + 7}&team_ids[]=` }

    } else if (data.getDate() + 7 >= 32) {
        switch (data.getMonth()) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                date = (data.getDate() + 7) - 31;
                break;
            case 3:
            case 5:
            case 8:
            case 10:
                date = (data.getDate() + 7) - 30;
                break;
            case 1:
                date = (data.getDate() + 7) - 28;
                break;
        }
        date = date.toString().length > 1 ? date : '0' + date;
        let formatedDate = `end_date=${year}-${monthJump}-${date}&team_ids[]=`;
        return formatedDate;
    } else { `end_date=${year}-${month}-${data.getDate() + 7}&team_ids[]=` }
}

function conferenceTraduction(conference) {
    if (conference == "East") {
        conference = "Leste";
    } else if (conference == "West") {
        conference = "Oeste";
    }
    return conference;
}

function cityNameCorrection(cityName) {
    switch (cityName) {
        case 'LA':
            cityName = 'Los Angeles';
            break;
        case 'Golden State':
            cityName = 'San Francisco';
            break;
        case 'Oklahoma City':
            cityName = 'Oklahoma';
            break;
        case 'Indiana':
            cityName = 'Indianapolis'
            break;
        case 'Brooklyn':
            cityName = 'New York'
            break;
        default:
    }
    return cityName;
}
