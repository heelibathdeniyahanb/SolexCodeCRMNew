using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class CreateUserLeadConnection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSendViaEmail",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "LeadClientId",
                table: "Lead",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "LeadClients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeadClients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeadClients_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lead_LeadClientId",
                table: "Lead",
                column: "LeadClientId");

            migrationBuilder.CreateIndex(
                name: "IX_LeadClients_UserId",
                table: "LeadClients",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lead_LeadClients_LeadClientId",
                table: "Lead",
                column: "LeadClientId",
                principalTable: "LeadClients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lead_LeadClients_LeadClientId",
                table: "Lead");

            migrationBuilder.DropTable(
                name: "LeadClients");

            migrationBuilder.DropIndex(
                name: "IX_Lead_LeadClientId",
                table: "Lead");

            migrationBuilder.DropColumn(
                name: "LeadClientId",
                table: "Lead");

            migrationBuilder.AddColumn<bool>(
                name: "IsSendViaEmail",
                table: "Users",
                type: "bit",
                nullable: true);
        }
    }
}
