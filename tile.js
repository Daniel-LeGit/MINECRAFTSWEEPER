const TILE = {
    NONE:0, 
    BOMB: 1,
    EXPLODED:2
}


export class Tile extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, grid_X, grid_Y, textures){
        
        super(scene, x, y, textures.covered);
        
        this.grid_pos = {
            
            x: grid_X,
            y: grid_Y
            
        }
        
        this.type = TILE.NONE;
        this.revealed = false;
        this.textures = textures;
        
        this.flagged = false;
        
        this.flag= this.scene.add.sprite(x, y, this.textures.flag);
        this.flag.depth = 1;
        this.flag.visible = false;

        this.godMode=false;

        this.number_of_bombs = 0;

        this.bomb_count_text = this.scene.add.text(x, y, '0', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#FFFF00'
        }).setOrigin(0.5);
        this.bomb_count_text.depth = 2;
        //this.bomb_count_text.visible = false;
        
        this.setInteractive();
        this.setTileTexture();
    }
    
    setTileTexture(){
        if (this.godMode==true){
            this.setTexture(this.getTexture());
        } else {
            let tex = this.revealed ? this.getTexture() : this.textures.covered;
            this.setTexture(tex);
            
        }
        this.flag.visible = this.flagged;                
        this.bomb_count_text.visible = false;
        if((this.revealed || this.godMode) && this.number_of_bombs>0) {
            this.bomb_count_text.visible = true;
        }
    }
    
    getTexture() {
        
        switch(this.type){
                
            case TILE.NONE:
                return this.textures.base; 
            case TILE.BOMB:
                return this.textures.bomb; 
            case TILE.EXPLODED:
                return this.textures.explosion; 
                
        }
        
        return undefined;
                
    }

    setNumberofBombs(bombs){
        this.number_of_bombs = bombs;
        this.bomb_count_text.text = bombs;
    }

    
    reveal(){
        
        this.revealed = true;
        this.setTileTexture();
        
    }
    
    mark(){
        
        this.flagged = !this.flagged;
        this.setTileTexture();
    }

    explode(){
        this.type = TILE.EXPLODED;
        this.setTileTexture();
    }
    
    turnIntoBomb(){
        
        this.type = TILE.BOMB;
        this.setTileTexture();
    }
    
    isBomb(){
        return (this.type===TILE.BOMB);
    }

    toggleGodMode() {
        this.godMode=!this.godMode;
        this.setTileTexture();
    }
}