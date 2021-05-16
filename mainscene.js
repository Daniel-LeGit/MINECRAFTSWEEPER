import {Tile} from './tile.js'

export default class MainScene extends Phaser.Scene{
    constructor(){
        
        super('MainScene');
        
    }
    
    init(){
        
        this.board = {
            
            width: 7,
            height: 9,
            bombs: 9, 
            tile_size: 96, 
            offset: {
                x: 102,
                y: 160
                
                
            }
        }
            
        this.input.mouse.disableContextMenu();

        this.input.keyboard.on('keydown-V', event=>{
            this.showboard(event);
        });
         
        this.input.on('gameobjectup', (pointer, go, event) => {
            
            this.mousePressed(pointer, go, event);
            
        });
        
        
        this.gameover = false;
        this.gameover_text = this.add.text(384, 552, '0', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);
        this.gameover_text.depth = 2;
        this.gameover_text.visible = false;        
        
    }
    
    
    preload(){
        
        
        
    }
    
    create(){
        
        
        this.bg=this.add.sprite(0,0,'BK').setOrigin(0);
        
        this.createMap();
        this.placebombs();
        this.countbombs();
    }
    
    
    update(time){
        
        
        
    }
    
    createMap(){
        
        let tile_faces = {
            
            base: 'squarePressed',
            covered: 'square',
            bomb: 'KaBoom',
            explosion: 'Kaboom2',
            flag: 'flappy',
            
        }
        
        this.tiles = [];
        
        for(let w = 0; w < this.board.width; w++){
            for(let h = 0; h < this.board.height; h++){
                let t = new Tile(
                this, 
                w * this.board.tile_size + this.board.offset.x, 
                h * this.board.tile_size + this.board.offset.y, 
                w, h, tile_faces        
                );
                this.add.existing(t);
                this.tiles.push(t);
            }
        }
    }
    
    mousePressed(pointer, go, event){
        if(!this.gameover) 
        {
            if(go.revealed == true){
           
                return;
                
             }
             
             if(pointer.rightButtonReleased()){
                 go.mark();
             } else if (!go.flagged) {
                 go.reveal();  
                 if(go.isBomb()) {
                     go.explode();
                     console.log("LOOOOSSEEER");
                     this.gameover_text.text = "LOOOOSSEEER";        
                     this.gameover_text.visible = true;
                     this.showbombs();        
                     this.gameover = true;
                 } else {
                     this.showOtherTiles(go); 
                 }
             }
             this.checkVictory();
        }
    }


    showOtherTiles(t){
        if (!t.isBomb() && t.number_of_bombs == 0){
            let grid_pos = t.grid_pos;
            let start_x = Math.max(grid_pos.x - 1, 0);
            let end_x = Math.min(grid_pos.x + 1, this.board.width - 1);
            let start_y = Math.max(grid_pos.y - 1, 0);
            let end_y = Math.min(grid_pos.y + 1, this.board.height - 1);

            let bomb_count = 0;

            for (let w = start_x; w<= end_x; w++) {
                for (let h = start_y; h <= end_y; h++) {
                    let other = this.tiles[w * this.board.height + h];
                    if(!other.isBomb() && !other.revealed && !other.flagged){
                        other.reveal();
                        this.showOtherTiles(other);
                    }
                }
            }
   
        }
        //this.checkVictory();
    }

    checkVictory() {
        let flagged_bombs = 0;
        let revealed = 0;

        this.tiles.forEach( t=> {
            if(t.isBomb() && t.flagged) {
                flagged_bombs++;
            } else if (t.revealed){
                revealed++;
            }
        });


        ///console.log(flagged_bombs);
        //console.log(revealed);
        if(flagged_bombs + revealed == this.tiles.length) {
            console.log("VICTORYYYYYYY");
            this.gameover_text.text = "VICTORYYYYYYY";        
            this.gameover_text.visible = true;        
            this.gameover = true;
        }
    }

    
    placebombs(){
        
        let bomb_count = 0;
        
        while(bomb_count < this.board.bombs) {
        
            let W = Math.floor(Math.random()* this.board.width);
            let H = Math.floor(Math.random()* this.board.height);
        
            let t = this.tiles[W * this.board.height + H];

            if(!t.isBomb()){
                t.turnIntoBomb();
                bomb_count++;
            }
                    
        }
        
    }

    countbombs(){
        this.tiles.forEach(
            t => {
                if(t.isBomb()){
                    return;
                }

                let grid_pos = t.grid_pos;
                let start_x = Math.max(grid_pos.x - 1, 0);
                let end_x = Math.min(grid_pos.x + 1, this.board.width - 1);
                let start_y = Math.max(grid_pos.y - 1, 0);
                let end_y = Math.min(grid_pos.y + 1, this.board.height - 1);

                let bomb_count = 0;

                for (let w = start_x; w<= end_x; w++) {
                    for (let h = start_y; h <= end_y; h++) {
                        if(w == grid_pos.x && h == grid_pos.y) {
                            continue;
                        }
                        
                        let other = this.tiles[w * this.board.height + h];
                        if(other.isBomb()){
                            bomb_count++;
                        }
                    }
                }

                t.setNumberofBombs(bomb_count);
            }
        );
    }
    

    showboard(){
    
        this.tiles.forEach(t=> t.toggleGodMode());

    }



    showbombs(){
        this.tiles.forEach(
            t => {
                if(t.isBomb()){
                    t.toggleGodMode();
                }
            }
        );
    }

}