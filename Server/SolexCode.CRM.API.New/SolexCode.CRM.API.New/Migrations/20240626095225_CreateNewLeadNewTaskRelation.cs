using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolexCode.CRM.API.New.Migrations
{
    /// <inheritdoc />
    public partial class CreateNewLeadNewTaskRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NewLeadId",
                table: "NewTasks",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "NewLeads",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "LeadManagerId",
                table: "NewLeads",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "NewLeadId",
                table: "Events",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedById",
                table: "Events",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_NewTasks_NewLeadId",
                table: "NewTasks",
                column: "NewLeadId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewTasks_NewLeads_NewLeadId",
                table: "NewTasks",
                column: "NewLeadId",
                principalTable: "NewLeads",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewTasks_NewLeads_NewLeadId",
                table: "NewTasks");

            migrationBuilder.DropIndex(
                name: "IX_NewTasks_NewLeadId",
                table: "NewTasks");

            migrationBuilder.DropColumn(
                name: "NewLeadId",
                table: "NewTasks");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "NewLeads",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LeadManagerId",
                table: "NewLeads",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NewLeadId",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CreatedById",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
