using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class RebuildEventsNewLeadRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "PersonalPhone",
                table: "Company");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Company",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PersonalPhone",
                table: "Company",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
