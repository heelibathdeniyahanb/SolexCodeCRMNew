using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class UserAndNewLeadRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LeadManagerId",
                table: "NewLeads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "NewLeads",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserFullName",
                table: "NewLeads",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            

            migrationBuilder.CreateIndex(
                name: "IX_NewLeads_UserId",
                table: "NewLeads",
                column: "UserId");

           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.DropIndex(
                name: "IX_NewLeads_UserId",
                table: "NewLeads");

            migrationBuilder.DropColumn(
                name: "LeadManagerId",
                table: "NewLeads");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "NewLeads");

            migrationBuilder.DropColumn(
                name: "UserFullName",
                table: "NewLeads");

        }
    }
}
