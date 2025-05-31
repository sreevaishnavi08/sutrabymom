import javax.swing.*;
import java.awt.*;

public class SnowmanGUIApp extends JFrame {

    private static final long serialVersionUID = 1L;

    public SnowmanGUIApp() {
        setTitle("Winter Wonderland");
        setSize(600, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Center window
        add(new DrawingPanel());     // Add custom panel
        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(SnowmanGUIApp::new);  // Safe threading
    }
}

class DrawingPanel extends JPanel {

    private static final long serialVersionUID = 1L;

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // Background
        g.setColor(new Color(173, 216, 230));
        g.fillRect(0, 0, getWidth(), getHeight());

        // Sun
        g.setColor(Color.YELLOW);
        g.fillOval(450, 50, 100, 100);

        // Snowman
        g.setColor(Color.WHITE);
        g.fillOval(200, 300, 120, 120);
        g.fillOval(220, 200, 100, 100);
        g.fillOval(240, 130, 80, 80);

        // Eyes
        g.setColor(Color.BLACK);
        g.fillOval(250, 150, 10, 10);
        g.fillOval(270, 150, 10, 10);

        // Buttons
        g.fillOval(270, 225, 10, 10);
        g.fillOval(270, 250, 10, 10);
        g.fillOval(270, 275, 10, 10);

        // Nose
        g.setColor(Color.ORANGE);
        int[] xPoints = {270, 290, 270};
        int[] yPoints = {160, 170, 180};
        g.fillPolygon(xPoints, yPoints, 3);

        // Hat
        g.setColor(Color.BLACK);
        g.fillRect(230, 100, 60, 10);
        g.fillRect(220, 110, 70, 20);

        // Scarf
        g.setColor(Color.RED);
        g.fillRect(215, 220, 80, 20);
        g.fillRect(235, 240, 20, 40);

        // Tree
        g.setColor(Color.GREEN);
        int[] xTreeTop = {100, 150, 50};
        int[] yTreeTop = {300, 400, 400};
        g.fillPolygon(xTreeTop, yTreeTop, 3);

        int[] xTreeBottom = {100, 160, 40};
        int[] yTreeBottom = {350, 460, 460};
        g.fillPolygon(xTreeBottom, yTreeBottom, 3);

        g.setColor(new Color(139, 69, 19));  // Brown trunk
        g.fillRect(90, 460, 20, 40);

        // Decorations
        g.setColor(Color.RED);
        g.fillOval(120, 350, 15, 15);
        g.setColor(Color.YELLOW);
        g.fillOval(110, 330, 15, 15);
        g.setColor(Color.BLUE);
        g.fillOval(130, 320, 15, 15);

        // Title
        g.setColor(Color.BLACK);
        g.setFont(new Font("Arial", Font.BOLD, 24));
        g.drawString("Winter Wonderland", 180, 50);
    }
}
