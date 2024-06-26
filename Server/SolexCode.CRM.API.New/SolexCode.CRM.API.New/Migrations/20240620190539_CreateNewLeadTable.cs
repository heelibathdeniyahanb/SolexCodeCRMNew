using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class CreateNewLeadTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NewLeadId",
                table: "Task",
                type: "int",
                nullable: true);

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

            migrationBuilder.CreateTable(
                name: "NewLeads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LeadName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    SalesRep = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SalesPipeline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LeadStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NewLeadClientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewLeads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewLeads_NewLeadClients_NewLeadClientId",
                        column: x => x.NewLeadClientId,
                        principalTable: "NewLeadClients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Task_NewLeadId",
                table: "Task",
                column: "NewLeadId");

            migrationBuilder.CreateIndex(
                name: "IX_NewLeadClients_UserId",
                table: "NewLeadClients",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_NewLeads_NewLeadClientId",
                table: "NewLeads",
                column: "NewLeadClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Task_NewLeads_NewLeadId",
                table: "Task",
                column: "NewLeadId",
                principalTable: "NewLeads",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Task_NewLeads_NewLeadId",
                table: "Task");

            migrationBuilder.DropTable(
                name: "NewLeads");

            migrationBuilder.DropTable(
                name: "NewLeadClients");

            migrationBuilder.DropIndex(
                name: "IX_Task_NewLeadId",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "NewLeadId",
                table: "Task");
        }
    }
}
