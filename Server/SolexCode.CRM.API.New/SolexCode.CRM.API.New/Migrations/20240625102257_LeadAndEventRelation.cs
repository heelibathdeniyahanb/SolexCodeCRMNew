using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class LeadAndEventRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RepeatUntilDate",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "RepeatUntilTime",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "Host",
                table: "Events",
                newName: "CreatedByName");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByEmail",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

           

            migrationBuilder.CreateIndex(
                name: "IX_Events_NewLeadId",
                table: "Events",
                column: "NewLeadId");

            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.DropIndex(
                name: "IX_Events_NewLeadId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CreatedByEmail",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Events");

            

            migrationBuilder.RenameColumn(
                name: "CreatedByName",
                table: "Events",
                newName: "Host");

            migrationBuilder.AddColumn<DateTime>(
                name: "RepeatUntilDate",
                table: "Events",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RepeatUntilTime",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
