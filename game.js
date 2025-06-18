// Oyuncu kontrolü
document.addEventListener('keydown', (e) => {
    const speed = 10;
    
    if (e.key === 'ArrowRight') {
        playerX = Math.min(playerX + speed, gameContainer.offsetWidth - player.offsetWidth);
    } else if (e.key === 'ArrowLeft') {
        playerX = Math.max(playerX - speed, 0);
    } else if (e.key === 'ArrowUp') {
        playerY = Math.max(playerY - speed, 0);
    } else if (e.key === 'ArrowDown') {
        playerY = Math.min(playerY + speed, gameContainer.offsetHeight - player.offsetHeight);
    }
    
    player.style.left = playerX + 'px';
    player.style.bottom = playerY + 'px';
});

// Düşman oluşturma
function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    
    const x = Math.random() * (gameContainer.offsetWidth - 30);
    enemy.style.left = x + 'px';
    enemy.style.top = '0px';
    
    gameContainer.appendChild(enemy);
    enemies.push({
        element: enemy,
        x: x,
        y: 0,
        speed: 2 + Math.random() * 3
    });
}

// Oyun döngüsü
function gameLoop() {
    // Düşmanları hareket ettir
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        enemy.y += enemy.speed;
        enemy.element.style.top = enemy.y + 'px';
        
        // Çarpışma kontrolü
        if (checkCollision(enemy)) {
            gameContainer.removeChild(enemy.element);
            enemies.splice(i, 1);
            i--;
            score += 10;
            scoreElement.textContent = score;
        }
        
        // Ekrandan çıkan düşmanları temizle
        if (enemy.y > gameContainer.offsetHeight) {
            gameContainer.removeChild(enemy.element);
            enemies.splice(i, 1);
            i--;
        }
    }
    
    // Yeni düşman oluştur
    if (Math.random() < 0.02) {
        createEnemy();
    }
    
    requestAnimationFrame(gameLoop);
}

// Çarpışma kontrolü
function checkCollision(enemy) {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();
    
    return !(
        playerRect.right < enemyRect.left || 
        playerRect.left > enemyRect.right || 
        playerRect.bottom < enemyRect.top || 
        playerRect.top > enemyRect.bottom
    );
}

// Oyunu başlat
gameLoop();