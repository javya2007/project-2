export class DynamicCanvasPlayer {
  constructor() {
    this.activeAnimations = new Map();
  }

  attachCanvas(canvasElement, reelData) {
    if (!canvasElement) return;

    // Stop existing animation if present
    this.detachCanvas(canvasElement);

    const ctx = canvasElement.getContext('2d');
    let frameId;
    let step = 0;

    const render = () => {
      step++;
      const w = canvasElement.width = canvasElement.clientWidth || 360;
      const h = canvasElement.height = canvasElement.clientHeight || 640;

      ctx.clearRect(0, 0, w, h);

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0c0f1d');
      grad.addColorStop(0.5, '#13182e');
      grad.addColorStop(1, '#090b14');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Render grid pattern
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Render according to visual type
      switch (reelData.visualType) {
        case 'code':
          this.renderCodeEditor(ctx, w, h, step, reelData);
          break;
        case 'diagram':
          this.renderArchitectureDiagram(ctx, w, h, step, reelData);
          break;
        case 'terminal':
          this.renderTerminal(ctx, w, h, step, reelData);
          break;
        case 'cloud':
          this.renderCloudNetwork(ctx, w, h, step, reelData);
          break;
        case 'graph':
          this.renderArrayGraph(ctx, w, h, step, reelData);
          break;
        case 'meme':
        default:
          this.renderMemeOverlay(ctx, w, h, step, reelData);
          break;
      }

      frameId = requestAnimationFrame(render);
    };

    render();
    this.activeAnimations.set(canvasElement, frameId);
  }

  detachCanvas(canvasElement) {
    if (this.activeAnimations.has(canvasElement)) {
      cancelAnimationFrame(this.activeAnimations.get(canvasElement));
      this.activeAnimations.delete(canvasElement);
    }
  }

  renderCodeEditor(ctx, w, h, step, reel) {
    // IDE Window Box
    const pad = 24;
    const boxW = w - pad * 2;
    const boxH = 320;
    const boxX = pad;
    const boxY = h / 2 - boxH / 2 - 20;

    // Window shadow & body
    ctx.save();
    ctx.shadowColor = 'rgba(99, 102, 241, 0.3)';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#111827';
    this.roundRect(ctx, boxX, boxY, boxW, boxH, 12, true, true);
    ctx.restore();

    // Window Header bar
    ctx.fillStyle = '#1f2937';
    this.roundRect(ctx, boxX, boxY, boxW, 36, { tl: 12, tr: 12, bl: 0, br: 0 }, true, false);

    // Header buttons (red, yellow, green)
    const dots = ['#ef4444', '#f59e0b', '#10b981'];
    dots.forEach((color, i) => {
      ctx.beginPath();
      ctx.arc(boxX + 20 + i * 18, boxY + 18, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // File tab title
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px "Fira Code", monospace';
    ctx.fillText(`${reel.topic.toLowerCase().replace(/[^a-z]/g, '')}_demo.js`, boxX + 80, boxY + 22);

    // Code lines rendering with simulated typing effect
    const lines = (reel.codeSnippet || "console.log('ReelSense AI');").split('\n');
    const typeSpeed = Math.floor(step / 3);
    let totalCharsDisplayed = 0;

    lines.forEach((line, i) => {
      const lineY = boxY + 60 + i * 24;
      if (lineY > boxY + boxH - 20) return;

      // Line number
      ctx.fillStyle = '#4b5563';
      ctx.font = '12px "Fira Code", monospace';
      ctx.fillText((i + 1).toString().padStart(2, ' '), boxX + 15, lineY);

      // Line text typing
      const charsAvailable = Math.max(0, typeSpeed - totalCharsDisplayed);
      const visibleText = line.substring(0, charsAvailable);
      totalCharsDisplayed += line.length + 1;

      // Colorize keywords
      ctx.fillStyle = line.includes('//') ? '#6b7280' : 
                      line.includes('const') || line.includes('function') || line.includes('class') || line.includes('import') ? '#a78bfa' : 
                      line.includes('return') || line.includes('if') || line.includes('for') ? '#f472b6' : '#34d399';
      ctx.fillText(visibleText, boxX + 45, lineY);
    });

    // Cursor Pulse
    if (Math.floor(step / 20) % 2 === 0) {
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(boxX + boxW - 30, boxY + boxH - 30, 10, 16);
    }
  }

  renderArchitectureDiagram(ctx, w, h, step, reel) {
    const pad = 24;
    const boxW = w - pad * 2;
    const boxH = 340;
    const boxX = pad;
    const boxY = h / 2 - boxH / 2;

    // Outer Glass Container
    ctx.fillStyle = 'rgba(17, 24, 39, 0.85)';
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, boxX, boxY, boxW, boxH, 16, true, true);

    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('SYSTEM ARCHITECTURE PIPELINE', boxX + 20, boxY + 35);

    // Nodes definition
    const nodes = [
      { label: 'Client App', x: boxX + boxW * 0.2, y: boxY + 90, color: '#3b82f6' },
      { label: 'API Gateway', x: boxX + boxW * 0.8, y: boxY + 90, color: '#8b5cf6' },
      { label: 'Microservice', x: boxX + boxW * 0.2, y: boxY + 220, color: '#10b981' },
      { label: 'Cache / DB', x: boxX + boxW * 0.8, y: boxY + 220, color: '#f59e0b' }
    ];

    // Connectors
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    ctx.lineTo(nodes[1].x, nodes[1].y);
    ctx.lineTo(nodes[3].x, nodes[3].y);
    ctx.moveTo(nodes[1].x, nodes[1].y);
    ctx.lineTo(nodes[2].x, nodes[2].y);
    ctx.stroke();

    // Animated Data Pulses moving along paths
    const progress = (step % 120) / 120;
    const px1 = nodes[0].x + (nodes[1].x - nodes[0].x) * progress;
    const py1 = nodes[0].y;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(px1, py1, 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw Nodes
    nodes.forEach(n => {
      ctx.fillStyle = n.color;
      this.roundRect(ctx, n.x - 50, n.y - 20, 100, 40, 8, true, false);
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + 4);
    });
    ctx.textAlign = 'left';
  }

  renderTerminal(ctx, w, h, step, reel) {
    const pad = 24;
    const boxW = w - pad * 2;
    const boxH = 300;
    const boxX = pad;
    const boxY = h / 2 - boxH / 2;

    ctx.fillStyle = '#05070e';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, boxX, boxY, boxW, boxH, 10, true, true);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 13px "Fira Code", monospace';
    ctx.fillText('bash - reelSense@cyber-node:~', boxX + 15, boxY + 30);

    const commands = (reel.codeSnippet || "$ sysctl -a").split('\n');
    commands.forEach((cmd, i) => {
      ctx.fillStyle = cmd.startsWith('$') || cmd.startsWith('#') ? '#34d399' : '#a7f3d0';
      ctx.font = '12px "Fira Code", monospace';
      ctx.fillText(cmd, boxX + 15, boxY + 70 + i * 26);
    });
  }

  renderCloudNetwork(ctx, w, h, step, reel) {
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = 90;

    // Orbit ring
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Center Cloud Core
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CLOUD', centerX, centerY + 4);

    // Satellites
    const numSatellites = 4;
    for (let i = 0; i < numSatellites; i++) {
      const angle = (step / 80) + (i * Math.PI * 2 / numSatellites);
      const sx = centerX + Math.cos(angle) * radius;
      const sy = centerY + Math.sin(angle) * radius;

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(sx, sy, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(`Node-${i+1}`, sx, sy + 3);
    }
    ctx.textAlign = 'left';
  }

  renderArrayGraph(ctx, w, h, step, reel) {
    const pad = 28;
    const boxW = w - pad * 2;
    const boxH = 280;
    const boxX = pad;
    const boxY = h / 2 - boxH / 2;

    ctx.fillStyle = 'rgba(17, 24, 39, 0.9)';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    this.roundRect(ctx, boxX, boxY, boxW, boxH, 12, true, true);

    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('DSA VISUALIZER: SLIDING WINDOW', boxX + 16, boxY + 35);

    // Array bars
    const arr = [40, 75, 30, 90, 60, 85, 50];
    const barW = 28;
    const gap = 12;
    const startX = boxX + (boxW - (arr.length * (barW + gap))) / 2;

    const activeIndex = Math.floor(step / 25) % (arr.length - 1);

    arr.forEach((val, i) => {
      const bx = startX + i * (barW + gap);
      const by = boxY + boxH - 40 - val;
      const isActive = i === activeIndex || i === activeIndex + 1;

      ctx.fillStyle = isActive ? '#a855f7' : '#374151';
      this.roundRect(ctx, bx, by, barW, val, 4, true, false);

      ctx.fillStyle = '#e5e7eb';
      ctx.font = '11px sans-serif';
      ctx.fillText(val.toString(), bx + 6, by - 8);
    });

    // Window box outline over active subarray
    const windowX = startX + activeIndex * (barW + gap) - 4;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2.5;
    this.roundRect(ctx, windowX, boxY + 70, (barW * 2) + gap + 8, boxH - 100, 8, false, true);
  }

  renderMemeOverlay(ctx, w, h, step, reel) {
    const boxW = w - 48;
    const boxH = 260;
    const boxX = 24;
    const boxY = h / 2 - boxH / 2;

    // Pulsing gradient border
    const pulse = Math.sin(step / 10) * 0.2 + 0.8;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.strokeStyle = `rgba(239, 68, 68, ${pulse})`;
    ctx.lineWidth = 2;
    this.roundRect(ctx, boxX, boxY, boxW, boxH, 16, true, true);

    // Warning Badge
    ctx.fillStyle = '#ef4444';
    this.roundRect(ctx, boxX + 20, boxY + 20, 110, 26, 13, true, false);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('⚠️ MEME / HYPE', boxX + 30, boxY + 37);

    // Meme Text
    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 16px sans-serif';
    const textLines = (reel.memeText || reel.title).split('\n');
    textLines.forEach((tl, i) => {
      ctx.fillText(tl, boxX + 20, boxY + 80 + i * 28);
    });

    // Snippet preview
    ctx.fillStyle = '#1e293b';
    this.roundRect(ctx, boxX + 20, boxY + 160, boxW - 40, 70, 8, true, false);
    ctx.fillStyle = '#fca5a5';
    ctx.font = '12px "Fira Code", monospace';
    ctx.fillText(reel.codeSnippet || "// Java Meme Error", boxX + 32, boxY + 200);
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }
}
