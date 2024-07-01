using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class addCustomerSupporter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "helpdeskContact",
                table: "Ticket",
                newName: "CustomerSupporterName");

            migrationBuilder.AddColumn<int>(
                name: "CustomerSupporterId",
                table: "Ticket",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerSupporterId",
                table: "Ticket");

            migrationBuilder.RenameColumn(
                name: "CustomerSupporterName",
                table: "Ticket",
                newName: "helpdeskContact");
        }
    }
}
