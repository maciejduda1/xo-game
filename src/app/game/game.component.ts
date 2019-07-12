import { Component, OnInit } from '@angular/core';


export class Field {
  fieldNumber: number;
  value: boolean;
  playerSelected: boolean;
  compSelected: boolean;
  constructor(fn: number, vl: boolean, plS: boolean, compS: boolean) {
    this.fieldNumber = fn;
    this.value = vl;
    this.playerSelected = plS;
    this.compSelected = compS;
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  winningCombs = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];
  gameBoard: {};
  boardRows = [1, 2, 3];
  playerTurn = true;
  gameEnded = false;

  constructor() { }

  ngOnInit() {
    this.createBoard();
  }

  createBoard() {
    let newBoard = {};
    for (let i = 1; i <= 9; i++ ) {
      newBoard = {
        ...newBoard, [i]: new Field(i, false, false, false)
      };
    }
    this.gameBoard = newBoard;
  }



  selectField(fieldNumber: number) {
    if (this.playerTurn && !this.gameBoard[fieldNumber].playerSelected || !this.gameBoard[fieldNumber].compSelected ) {
      this.gameBoard[fieldNumber] = {
        ...this.gameBoard[fieldNumber],
        value: true,
        playerSelected: true
      };
      this.playerTurn = !this.playerTurn;
      this.checkWinner();
      this.computerMove(fieldNumber);
    }
  }

  computerMove(fieldNumber: number) {
    if ( !this.gameBoard[fieldNumber].playerSelected || !this.gameBoard[fieldNumber].compSelected ) {
      this.gameBoard[fieldNumber + 1] = {
        ...this.gameBoard[fieldNumber],
        value: true,
        compSelected: true
      };
      this.checkWinner();
      this.playerTurn = !this.playerTurn;
    }
  }

  checkWinner() {
    this.winningCombs.map(
      combo => {
        const startingCombo = combo;
        // console.log('combo startowe', startingCombo);
        let playerWinCombo = [];
        let pcWinCombo = [];
        combo.filter(
          value => {
            if ( this.gameBoard[value] && this.gameBoard[value].playerSelected ) {
              playerWinCombo = [...playerWinCombo, value];
              // console.log('player: ', playerWinCombo);
              if ( startingCombo.length === playerWinCombo.length ) {
                console.log('Player Won');
                this.gameEnded = true;
              }
            } else if (this.gameBoard[value] && this.gameBoard[value].compSelected) {
              pcWinCombo = [...pcWinCombo, value];
              if (startingCombo.length === pcWinCombo.length) {
                console.log('PC Won');
                this.gameEnded = true;
              }
            }
          }
        );
      }
    );
  }

}
