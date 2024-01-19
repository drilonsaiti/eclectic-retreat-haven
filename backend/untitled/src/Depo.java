import java.util.Scanner;

class InvalidNrItems extends Exception {
    public InvalidNrItems(String message) {
        super(message);
    }
}

class NotSupportedType extends Exception {
    public NotSupportedType(String message) {
        super(message);
    }
}

class Depo {
    private String lloji;
    private float kapaciteti;
    private int nr_items;
    private String emri;

    public Depo(String lloji, float kapaciteti, int nr_items, String emri) throws NotSupportedType, InvalidNrItems {
        if (!isValidLloji(lloji)) {
            throw new NotSupportedType("Lloji i depo-së nuk është i mbështetur");
        }

        if (!isValidNrItems(nr_items)) {
            throw new InvalidNrItems("Numri i pavlefshëm i artikujve");
        }

        this.lloji = lloji;
        this.kapaciteti = kapaciteti;
        this.nr_items = nr_items;
        this.emri = emri;
    }

    public String getLloji() {
        return lloji;
    }

    public void setLloji(String lloji) throws NotSupportedType {
        if (!isValidLloji(lloji)) {
            throw new NotSupportedType("Lloji i depo-së nuk është i mbështetur");
        }

        this.lloji = lloji;
    }

    public float getKapaciteti() {
        return kapaciteti;
    }

    public void setKapaciteti(float kapaciteti) {
        this.kapaciteti = kapaciteti;
    }

    public int getNrItems() {
        return nr_items;
    }

    public void setNrItems(int nr_items) throws InvalidNrItems {
        if (!isValidNrItems(nr_items)) {
            throw new InvalidNrItems("Numri i pavlefshëm i artikujve");
        }

        this.nr_items = nr_items;
    }

    public String getEmri() {
        return emri;
    }

    public void setEmri(String emri) {
        this.emri = emri;
    }

    private static boolean isValidNrItems(int nr_items) {
        return nr_items >= 1 && nr_items <= 100;
    }

    private static boolean isValidLloji(String lloji) {
        return lloji.equals("DataBaseRepository") || lloji.equals("EmailRepository") || lloji.equals("SoftwareRepository");
    }

    public void print() {
        System.out.println("lloji: " + lloji + " kapaciteti_magazinimi: " + kapaciteti + " emri: " + emri);
    }

    public void input() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Vendosni llojin: ");
        String llojiInput = scanner.nextLine();

        System.out.print("Vendosni kapacitetin: ");
        float kapacitetiInput = scanner.nextFloat();

        System.out.print("Vendosni numrin e artikujve: ");
        int nr_itemsInput = scanner.nextInt();

        System.out.print("Vendosni emrin: ");
        String emriInput = scanner.next();

        try {
            setLloji(llojiInput);
            setKapaciteti(kapacitetiInput);
            setNrItems(nr_itemsInput);
            setEmri(emriInput);
        } catch (NotSupportedType | InvalidNrItems e) {
            System.out.println(e.getMessage());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Depo depo = new Depo("DataBaseRepository", 100.0f, 50, "Depo1");

        depo.print();

        Depo depo2 = new Depo("InvalidType", 200.0f, 120, "Depo2");

        depo2.print();
    }
}

