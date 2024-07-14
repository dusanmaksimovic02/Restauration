namespace backend.Data;

public class DataContext : IdentityDbContext<Osoba>
{
    public DbSet<Konobar> Konobari { get; set; }
    public DbSet<Sanker> Sankeri { get; set; }
    public DbSet<Kuvar> Kuvari { get; set; }
    public DbSet<Menadzer> Menadzeri { get; set; }
    public DbSet<Hrana> Hrana { get; set; }
    public DbSet<Pice> Pica { get; set; }
    public DbSet<Sto> Stolovi { get; set; }
    public DbSet<Narudzbina> Narudzbine { get; set; }
    public DbSet<Admin> Admini { get; set; }
    public DbSet<Musterija> Musterije { get; set; }
    public DbSet<Recenzija> Recenzije { get; set; }
    public DbSet<NarudzbinaHrana> NarudzbinaHrana { get; set; }
    public DbSet<NarudzbinaPice> NarudzbinaPice { get; set; }
    
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Osoba>()
            .HasDiscriminator<string>("TipOsobe")
            .HasValue<Osoba>("Osoba")
            .HasValue<Zaposlen>("Zaposlen")
            .HasValue<Konobar>("Konobar")
            .HasValue<Kuvar>("Kuvar")
            .HasValue<Sanker>("Sanker")
            .HasValue<Menadzer>("Menadzer");

        modelBuilder.Entity<Menadzer>()
            .HasBaseType<Zaposlen>();

        modelBuilder.Entity<Konobar>()
            .HasBaseType<Zaposlen>();

        modelBuilder.Entity<Kuvar>()
            .HasBaseType<Zaposlen>();

        modelBuilder.Entity<Sanker>()
            .HasBaseType<Zaposlen>();

        modelBuilder.Entity<Menadzer>()
            .HasBaseType<Zaposlen>();

        modelBuilder.Entity<Konobar>()
            .HasBaseType<Zaposlen>();

        modelBuilder.Entity<Kuvar>()
            .HasBaseType<Zaposlen>();

        modelBuilder.Entity<Sanker>()
            .HasBaseType<Zaposlen>();

        modelBuilder.Entity<NarudzbinaHrana>()
            .HasOne(nh => nh.Narudzbina)
            .WithMany(n => n.NarudzbinaHrana)
            .HasForeignKey(nh => nh.NarudzbinaId);

        modelBuilder.Entity<NarudzbinaHrana>()
            .HasOne(nh => nh.Hrana)
            .WithMany()
            .HasForeignKey(nh => nh.HranaId);

        modelBuilder.Entity<NarudzbinaPice>()
            .HasOne(np => np.Narudzbina)
            .WithMany(n => n.NarudzbinaPice)
            .HasForeignKey(np => np.NarudzbinaId);

        modelBuilder.Entity<NarudzbinaPice>()
            .HasOne(np => np.Pice)
            .WithMany()
            .HasForeignKey(np => np.PiceId);

        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Hrana>().ToTable("Hrana");
        modelBuilder.Entity<Pice>().ToTable("Pice");
    }
}