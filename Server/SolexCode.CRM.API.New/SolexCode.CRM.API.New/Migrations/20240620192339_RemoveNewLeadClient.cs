using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class RemoveNewLeadClient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewLeads_NewLeadClients_NewLeadClientId",
                table: "NewLeads");

            migrationBuilder.DropTable(
                name: "NewLeadClients");

            migrationBuilder.DropIndex(
                name: "IX_NewLeads_NewLeadClientId",
                table: "NewLeads");

            migrationBuilder.DropColumn(
                name: "NewLeadClientId",
                table: "NewLeads");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NewLeadClientId",
                table: "NewLeads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "NewLeadClients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewLeadClients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewLeadClients_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewLeads_NewLeadClientId",
                table: "NewLeads",
                column: "NewLeadClientId");

            migrationBuilder.CreateIndex(
                name: "IX_NewLeadClients_UserId",
                table: "NewLeadClients",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewLeads_NewLeadClients_NewLeadClientId",
                table: "NewLeads",
                column: "NewLeadClientId",
                principalTable: "NewLeadClients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
