# BattleShip Board Game

The aim of the project is to design and implement a simulation of a strategic board game Batteship for two people.

## Rules:

These are the rules of battleship that I was guided by when creating the game
[Rules](<https://www.hasbro.com/common/instruct/BattleShip_(2002).PDF>)

## Technologies
### Backend:
- [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet)
- [SignalR](https://docs.microsoft.com/en-us/aspnet/signalr/)
### Frontend
- [React with Typescript](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux)
- [Axios](https://github.com/axios/axios)

## Usage

### Local setup

Fetch project and run it by:

```bash
git clone https://github.com/RozanskiP/BattleshipBoardGame.git

cd BattleshipBoardGame

docker-compose build

docker-compose up
```
Open http://localhost:5001 to view it in the browser.

Or

- run c# project 

```bash
npm start
```

Open http://localhost:3000 to view it in the browser.

## Design Assumption
I started my work with choosing the technology, I knew I would do the backend in c# and I decided to choose asp.net and websockets, because fast communication and displaying movements were important.

Frontend was done in React technologies in typescript, and in a simple library to improve the appearance of MUI and Bootstrap.

The game was created in such a way that it was easy to modify its dependencies and develop quickly, interfaces or enums were created in places that I thought were right.
The most difficult decisions I had to make while writing was selecting and dividing up the classes appropriately. They had to be designed in such a way that they were responsible for the selected elements.

For the purposes of the project, I implemented one random solving algorithm, come in the plans and in the project we can see 3 possible that would be developed in the next stage.

I couldn't finish running dockerization because SignalR requires you to have certificates that won't add themselves properly.

## License

[MIT](https://choosealicense.com/licenses/mit/)
