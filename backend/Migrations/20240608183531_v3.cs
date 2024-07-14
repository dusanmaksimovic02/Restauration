using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class v3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hrana_Narudzbine_FKHrana",
                table: "Hrana");

            migrationBuilder.DropForeignKey(
                name: "FK_Pice_Narudzbine_FKPice",
                table: "Pice");

            migrationBuilder.DropIndex(
                name: "IX_Pice_FKPice",
                table: "Pice");

            migrationBuilder.DropIndex(
                name: "IX_Hrana_FKHrana",
                table: "Hrana");

            migrationBuilder.DropColumn(
                name: "FKPice",
                table: "Pice");

            migrationBuilder.DropColumn(
                name: "FKHrana",
                table: "Hrana");

            migrationBuilder.CreateTable(
                name: "NarudzbinaHrana",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NarudzbinaId = table.Column<int>(type: "int", nullable: false),
                    HranaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NarudzbinaHrana", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NarudzbinaHrana_Hrana_HranaId",
                        column: x => x.HranaId,
                        principalTable: "Hrana",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NarudzbinaHrana_Narudzbine_NarudzbinaId",
                        column: x => x.NarudzbinaId,
                        principalTable: "Narudzbine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NarudzbinaPice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NarudzbinaId = table.Column<int>(type: "int", nullable: false),
                    PiceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NarudzbinaPice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NarudzbinaPice_Narudzbine_NarudzbinaId",
                        column: x => x.NarudzbinaId,
                        principalTable: "Narudzbine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NarudzbinaPice_Pice_PiceId",
                        column: x => x.PiceId,
                        principalTable: "Pice",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NarudzbinaHrana_HranaId",
                table: "NarudzbinaHrana",
                column: "HranaId");

            migrationBuilder.CreateIndex(
                name: "IX_NarudzbinaHrana_NarudzbinaId",
                table: "NarudzbinaHrana",
                column: "NarudzbinaId");

            migrationBuilder.CreateIndex(
                name: "IX_NarudzbinaPice_NarudzbinaId",
                table: "NarudzbinaPice",
                column: "NarudzbinaId");

            migrationBuilder.CreateIndex(
                name: "IX_NarudzbinaPice_PiceId",
                table: "NarudzbinaPice",
                column: "PiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NarudzbinaHrana");

            migrationBuilder.DropTable(
                name: "NarudzbinaPice");

            migrationBuilder.AddColumn<int>(
                name: "FKPice",
                table: "Pice",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FKHrana",
                table: "Hrana",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pice_FKPice",
                table: "Pice",
                column: "FKPice");

            migrationBuilder.CreateIndex(
                name: "IX_Hrana_FKHrana",
                table: "Hrana",
                column: "FKHrana");

            migrationBuilder.AddForeignKey(
                name: "FK_Hrana_Narudzbine_FKHrana",
                table: "Hrana",
                column: "FKHrana",
                principalTable: "Narudzbine",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pice_Narudzbine_FKPice",
                table: "Pice",
                column: "FKPice",
                principalTable: "Narudzbine",
                principalColumn: "Id");
        }
    }
}
