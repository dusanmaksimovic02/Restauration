﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240707025908_v7")]
    partial class v7
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("NarudzbinaZaposlen", b =>
                {
                    b.Property<int>("NarudzbineId")
                        .HasColumnType("int");

                    b.Property<string>("ZaposleniId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("NarudzbineId", "ZaposleniId");

                    b.HasIndex("ZaposleniId");

                    b.ToTable("NarudzbinaZaposlen");
                });

            modelBuilder.Entity("backend.Models.Hrana", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Cena")
                        .HasColumnType("float");

                    b.Property<long>("Kolicina")
                        .HasColumnType("bigint");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SlikaUrl")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Stastojci")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("VremePripreme")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Hrana", (string)null);
                });

            modelBuilder.Entity("backend.Models.Narudzbina", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Cena")
                        .HasColumnType("float");

                    b.Property<string>("FKMusterija")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("FKSto")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<long>("VremePripreme")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("FKMusterija");

                    b.HasIndex("FKSto")
                        .IsUnique()
                        .HasFilter("[FKSto] IS NOT NULL");

                    b.ToTable("Narudzbine");
                });

            modelBuilder.Entity("backend.Models.NarudzbinaHrana", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("HranaId")
                        .HasColumnType("int");

                    b.Property<int>("KolicinaZaPripremu")
                        .HasColumnType("int");

                    b.Property<int>("NarudzbinaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("HranaId");

                    b.HasIndex("NarudzbinaId");

                    b.ToTable("NarudzbinaHrana");
                });

            modelBuilder.Entity("backend.Models.NarudzbinaPice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("KolicinaZaPripremu")
                        .HasColumnType("int");

                    b.Property<int>("NarudzbinaId")
                        .HasColumnType("int");

                    b.Property<int>("PiceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("NarudzbinaId");

                    b.HasIndex("PiceId");

                    b.ToTable("NarudzbinaPice");
                });

            modelBuilder.Entity("backend.Models.Osoba", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Adresa")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("DatumRodjenja")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("ForgotPasswordExp")
                        .HasColumnType("datetime2");

                    b.Property<string>("Grad")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Pol")
                        .HasMaxLength(1)
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SlikaUrl")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("TipOsobe")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)");

                    b.Property<string>("TokenForgotPassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator<string>("TipOsobe").HasValue("Osoba");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("backend.Models.Pice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Cena")
                        .HasColumnType("float");

                    b.Property<long>("Kolicina")
                        .HasColumnType("bigint");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SlikaUrl")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Pice", (string)null);
                });

            modelBuilder.Entity("backend.Models.Recenzija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DatumPostavljanja")
                        .HasColumnType("date");

                    b.Property<string>("FKMusterija")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Naslov")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<int>("Ocena")
                        .HasColumnType("int");

                    b.Property<string>("Tekst")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FKMusterija");

                    b.ToTable("Recenzije");
                });

            modelBuilder.Entity("backend.Models.Sto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<long>("Kapacitet")
                        .HasColumnType("bigint");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Stolovi");
                });

            modelBuilder.Entity("backend.Models.Musterija", b =>
                {
                    b.HasBaseType("backend.Models.Osoba");

                    b.HasDiscriminator().HasValue("Musterija");
                });

            modelBuilder.Entity("backend.Models.Zaposlen", b =>
                {
                    b.HasBaseType("backend.Models.Osoba");

                    b.Property<DateOnly>("DatumZaposljavanja")
                        .HasColumnType("date");

                    b.Property<double>("Plata")
                        .HasColumnType("float");

                    b.Property<DateOnly>("ZaposlenDo")
                        .HasColumnType("date");

                    b.HasDiscriminator().HasValue("Zaposlen");
                });

            modelBuilder.Entity("backend.Models.Admin", b =>
                {
                    b.HasBaseType("backend.Models.Zaposlen");

                    b.HasDiscriminator().HasValue("Admin");
                });

            modelBuilder.Entity("backend.Models.Konobar", b =>
                {
                    b.HasBaseType("backend.Models.Zaposlen");

                    b.HasDiscriminator().HasValue("Konobar");
                });

            modelBuilder.Entity("backend.Models.Kuvar", b =>
                {
                    b.HasBaseType("backend.Models.Zaposlen");

                    b.HasDiscriminator().HasValue("Kuvar");
                });

            modelBuilder.Entity("backend.Models.Menadzer", b =>
                {
                    b.HasBaseType("backend.Models.Zaposlen");

                    b.HasDiscriminator().HasValue("Menadzer");
                });

            modelBuilder.Entity("backend.Models.Sanker", b =>
                {
                    b.HasBaseType("backend.Models.Zaposlen");

                    b.HasDiscriminator().HasValue("Sanker");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("backend.Models.Osoba", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("backend.Models.Osoba", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Osoba", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("backend.Models.Osoba", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("NarudzbinaZaposlen", b =>
                {
                    b.HasOne("backend.Models.Narudzbina", null)
                        .WithMany()
                        .HasForeignKey("NarudzbineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Zaposlen", null)
                        .WithMany()
                        .HasForeignKey("ZaposleniId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Narudzbina", b =>
                {
                    b.HasOne("backend.Models.Musterija", "Musterija")
                        .WithMany()
                        .HasForeignKey("FKMusterija");

                    b.HasOne("backend.Models.Sto", "Sto")
                        .WithOne("Narudzbina")
                        .HasForeignKey("backend.Models.Narudzbina", "FKSto");

                    b.Navigation("Musterija");

                    b.Navigation("Sto");
                });

            modelBuilder.Entity("backend.Models.NarudzbinaHrana", b =>
                {
                    b.HasOne("backend.Models.Hrana", "Hrana")
                        .WithMany()
                        .HasForeignKey("HranaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Narudzbina", "Narudzbina")
                        .WithMany("NarudzbinaHrana")
                        .HasForeignKey("NarudzbinaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Hrana");

                    b.Navigation("Narudzbina");
                });

            modelBuilder.Entity("backend.Models.NarudzbinaPice", b =>
                {
                    b.HasOne("backend.Models.Narudzbina", "Narudzbina")
                        .WithMany("NarudzbinaPice")
                        .HasForeignKey("NarudzbinaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Pice", "Pice")
                        .WithMany()
                        .HasForeignKey("PiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Narudzbina");

                    b.Navigation("Pice");
                });

            modelBuilder.Entity("backend.Models.Recenzija", b =>
                {
                    b.HasOne("backend.Models.Musterija", "Musterija")
                        .WithMany()
                        .HasForeignKey("FKMusterija");

                    b.Navigation("Musterija");
                });

            modelBuilder.Entity("backend.Models.Narudzbina", b =>
                {
                    b.Navigation("NarudzbinaHrana");

                    b.Navigation("NarudzbinaPice");
                });

            modelBuilder.Entity("backend.Models.Sto", b =>
                {
                    b.Navigation("Narudzbina");
                });
#pragma warning restore 612, 618
        }
    }
}
