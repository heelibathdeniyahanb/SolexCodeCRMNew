using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class initialSetup2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "NewLeads",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_NewLeads_UserId1",
                table: "NewLeads",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_NewLeads_Users_UserId1",
                table: "NewLeads",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewLeads_Users_UserId1",
                table: "NewLeads");

            migrationBuilder.DropIndex(
                name: "IX_NewLeads_UserId1",
                table: "NewLeads");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "NewLeads");
        }
    }
}
