using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class v8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Narudzbine_FKSto",
                table: "Narudzbine");

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_FKSto",
                table: "Narudzbine",
                column: "FKSto");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Narudzbine_FKSto",
                table: "Narudzbine");

            migrationBuilder.CreateIndex(
                name: "IX_Narudzbine_FKSto",
                table: "Narudzbine",
                column: "FKSto",
                unique: true,
                filter: "[FKSto] IS NOT NULL");
        }
    }
}
