using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class v7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KolicinaZaPripremu",
                table: "NarudzbinaPice",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KolicinaZaPripremu",
                table: "NarudzbinaHrana",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KolicinaZaPripremu",
                table: "NarudzbinaPice");

            migrationBuilder.DropColumn(
                name: "KolicinaZaPripremu",
                table: "NarudzbinaHrana");
        }
    }
}
