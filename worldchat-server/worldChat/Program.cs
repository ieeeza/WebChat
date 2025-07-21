using Microsoft.EntityFrameworkCore;
using worldChat.Authentication;
using worldChat.DataContext;
using worldChat.Hubs;
using worldChat.Service.TokenServices;
using worldChat.Service.UsuarioService;

var builder = WebApplication.CreateBuilder(args);

var JwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();

if (JwtSettings == null || string.IsNullOrEmpty(JwtSettings.SecretKey))
{
    throw new InvalidOperationException("JwtSettings or SecretKey is not configured properly.");
}

builder.Services.AddJwtAuthentication(JwtSettings.SecretKey);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000", "https://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddScoped<IUsuarioInterface, UsuarioService>();
builder.Services.AddScoped<TokenService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chats")
    .RequireAuthorization();

await app.RunAsync();
