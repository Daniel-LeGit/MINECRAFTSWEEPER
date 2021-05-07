const TILE = {
    
    NONE:0, 
    BOMB: 1,
    EXPLODED:2
    
}


export default class Tile extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, textures){
        
        super(scene, x, y, textures.covered);
        
        this.grid_pos = {
            
            x: grid_X,
            y: grid_Y
            
        }
        
        this.type = TILE.NONE;
        this.revealed = false;
        this.textures = textures;
        
        this.setInteractive();
        this.setTileTexture();
        this.flagged = false;
        
        this.flag= this.scene.add.sprite(x, y, this.textures.flag);
        this.flag.depth = 1;
        this.flag.visible = false;
        
    }
    
    setTileTexture(){
        
        let tex = this.revealed ? this.getTexture() : this.textures.covered;
        this.getTexture(tex);
        
    }
    
    getTexture() {
        
        switch(this.type){
                
            case TILE.NONE:
                return this.textures.base;
            case TILE.BOMB:
                return this.textures.bomb;
            case TILE.EXPLODED:
                return this.textures.explostion;
                
        }
        
        return undefined;
        
        this.flag.visible = this.flagged;
        
    }
    
    reveal(){
        
        this.revealed = true;
        this.setTileTexture();
        
    }
    
    mark(){
        
        this.flagged = true;
        this.setTileTexture();
    }
    
    turnIntoBomb(){
        
        this.type = TILE.BOMB;
        
    }
    
}