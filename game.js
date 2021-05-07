import MainScene from './mainscene.js'
import LoadScene from './loadscene.js'

const config = {
    
    width: 725, 
    height: 640,
    type: Phaser.AUTO,
    parent: 'GameStop',
    backgroundColor:'#000000', 
    scene: [LoadScene, MainScene]
    
}

new Phaser.Game(config);