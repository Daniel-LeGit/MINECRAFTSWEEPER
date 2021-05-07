import {Tile} from './tile.js'

export default class MainScene extends Phaser.Scene{
    constructor(){
        
        super('MainScene');
        
    }
    
    init(){
        
        this.board = {
            
            width: 10,
            height: 9,
            bombs: 9, 
            tile_size: 69, 
            offset: {
                x: grid_X,
                y: grid_Y
                
                
            }
            
            this.input.keyboard.on('keydown-V', event);
            
            this.input.on('gameobjectup', (pointer, go, event) => {
            
            this.mouse
            
        });
            
        }
        
    }
    
    
    preload(){
        
        
        
    }
    
    create(){
        
        
        this.bg=this.add.sprite(0,0,'BK').setOrigin(0);
        
        this.createMap();
        this.placebombs();
        
    }
    
    
    update(time){
        
        
        
    }
    
    createMap(){
        
        let tile_faces = {
            
            base: 'squarePressed',
            covered: 'square',
            bomb: 'bomb',
            explostion: 'bombRed',
            flag: 'flappy',
            
        }
        
        this.tiles = [];
        
        for(let w = 0; w < this.board.width; w++){
            for(let h = 0; h < this.board.height; h++){
                let t = new Tile(
                
                this, 
                w * this.board.tile_size + this.board.offset.x, 
                h * this.board.tile_size + this.board.offset.y, 
                w, h, 'square'        
                );
                this.add.existing(t);
                this.tiles.push(t);
            }
        }
        
    }
    
    mousePressed(pointer, go, event){
        if(go.revealed = true){
           
           return;
           
           }
        
        if(pointer.rightButtonReleased()){
            
            go.mark();
            
        } else if (!go.flagged) {
         
        
        go.reveal();   
            
            
        }
        
    }
    
    placebombs(){
        
        let bomb_count = 0;
        
        while(bomb_count < this.board.bombs) {
        
        let W = Math.floor(Math.random()* this.board.width);
        let H = Math.floor(Math.random()* this.board.height);
        
        let t = this.tiles[W * this.board.height + H];
        t.turnIntoBomb();
        bomb_count++;
        
        }
        
    }
    
showboard(){
    
    this.Tile
    
}

}