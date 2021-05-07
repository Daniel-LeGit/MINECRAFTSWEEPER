export default class LoadScene extends Phaser.Scene{
    constructor(){
        
        super('LoadScene');
        
    }
    
    
    preload(){
        
        this.load.image('BK', './IMGS/backGround.png');
        this.load.image('square', './IMGS/square.png');
        this.load.image('squarePressed', './IMGS/squarePressed.png');
        this.load.image('KaBoom', './IMGS/bomb.png');
        this.load.image('Kaboom2', './IMGS/bombred.png');
        this.load.image('flappy', './IMGS/flag.png');
        
    }
    
    create(){
        
        this.input.mouse.disableContextMenu();
        
        this.scene.start('MainScene');
        
        
    }
    
    
    
    
    
}