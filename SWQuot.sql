USE [master]
GO
/****** Object:  Database [SWQuot]    Script Date: 29-11-2022 17:24:43 ******/
CREATE DATABASE [SWQuot]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DoorQuot', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\DoorQuot.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DoorQuot_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\DoorQuot_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SWQuot] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SWQuot].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SWQuot] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SWQuot] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SWQuot] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SWQuot] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SWQuot] SET ARITHABORT OFF 
GO
ALTER DATABASE [SWQuot] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SWQuot] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SWQuot] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SWQuot] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SWQuot] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SWQuot] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SWQuot] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SWQuot] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SWQuot] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SWQuot] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SWQuot] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SWQuot] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SWQuot] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SWQuot] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SWQuot] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SWQuot] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SWQuot] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SWQuot] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SWQuot] SET  MULTI_USER 
GO
ALTER DATABASE [SWQuot] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SWQuot] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SWQuot] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SWQuot] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SWQuot] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SWQuot] SET QUERY_STORE = OFF
GO
USE [SWQuot]
GO
/****** Object:  User [lokesh]    Script Date: 29-11-2022 17:24:43 ******/
CREATE USER [lokesh] FOR LOGIN [lokesh] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[tbl_City]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_City](
	[Id] [int] NOT NULL,
	[StateId] [int] NOT NULL,
	[CityName] [nchar](10) NOT NULL,
 CONSTRAINT [PK_tbl_City] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Country]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Country](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Country] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_CustomerAddress]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_CustomerAddress](
	[AddressCode] [int] NOT NULL,
	[CustomerName] [nvarchar](50) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[District] [nvarchar](50) NOT NULL,
	[State] [nvarchar](50) NOT NULL,
	[Country] [nvarchar](50) NOT NULL,
	[Address1] [nvarchar](50) NOT NULL,
	[Address2] [nvarchar](50) NOT NULL,
	[Address3] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Customers]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Customers](
	[CustID] [nvarchar](50) NOT NULL,
	[CustName] [nvarchar](50) NOT NULL,
	[MobNo] [nvarchar](50) NOT NULL,
	[AltMobNo] [nvarchar](50) NOT NULL,
	[EmailID] [nvarchar](50) NOT NULL,
	[DOB] [date] NOT NULL,
	[GSTNo] [nvarchar](50) NULL,
	[BillTo] [nvarchar](15) NULL,
	[ShipTo] [nvarchar](15) NULL,
 CONSTRAINT [PK_tbl_Customes] PRIMARY KEY CLUSTERED 
(
	[CustID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_GST]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_GST](
	[ID] [int] NOT NULL,
	[StateID] [nvarchar](50) NOT NULL,
	[GST] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_tbl_GST] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Payment]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Payment](
	[TransationID] [nvarchar](50) NOT NULL,
	[QuotID] [nvarchar](50) NOT NULL,
	[TotalAmt] [decimal](18, 0) NOT NULL,
	[AmtPaid] [decimal](18, 0) NOT NULL,
	[Discount] [decimal](18, 0) NOT NULL,
	[Balanced] [decimal](18, 0) NOT NULL,
	[PaymentType] [nvarchar](50) NOT NULL,
	[UPI] [nvarchar](50) NULL,
	[BankTransfer] [nvarchar](50) NULL,
 CONSTRAINT [PK_tbl_Payment] PRIMARY KEY CLUSTERED 
(
	[TransationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_ProductCategory]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_ProductCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Category] [nchar](20) NOT NULL,
 CONSTRAINT [PK_tbl_ProductCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_ProductImg]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_ProductImg](
	[Position] [int] NOT NULL,
	[ProductID] [int] NOT NULL,
	[ImgName] [nvarchar](100) NULL,
	[ImgPath] [nvarchar](200) NULL,
	[ProductColour] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Position] ASC,
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_ProductPrice]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_ProductPrice](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ProductID] [nvarchar](50) NOT NULL,
	[FromDate] [date] NULL,
	[ToDate] [date] NULL,
	[NetPrice] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_tbl_ProductPrice] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Products]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Products](
	[ProductID] [nvarchar](50) NOT NULL,
	[ProductCatogery] [nvarchar](50) NOT NULL,
	[ProductName] [nvarchar](max) NOT NULL,
	[Height] [decimal](18, 0) NULL,
	[Width] [decimal](18, 0) NULL,
	[Depth] [decimal](18, 0) NULL,
	[Thickness] [decimal](18, 0) NULL,
	[UOM] [nvarchar](50) NULL,
 CONSTRAINT [PK_tbl_Products] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_QuotHeader]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_QuotHeader](
	[QuatID] [int] IDENTITY(1,1) NOT NULL,
	[CustID] [int] NULL,
	[QuotationDate] [date] NULL,
	[BillTo] [nvarchar](50) NULL,
	[ShipTo] [nvarchar](50) NULL,
	[GrossAmt] [decimal](18, 0) NULL,
	[DiscountAmt] [decimal](18, 0) NULL,
	[NetAmt] [decimal](18, 0) NULL,
	[Tax] [decimal](18, 0) NULL,
	[TotalAmt] [decimal](18, 0) NULL,
	[Advance] [decimal](18, 0) NULL,
	[Balance] [decimal](18, 0) NULL,
 CONSTRAINT [PK_tbl_QuotHeader] PRIMARY KEY CLUSTERED 
(
	[QuatID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_QuotLiner]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_QuotLiner](
	[QuatID] [int] NOT NULL,
	[Position] [int] NOT NULL,
	[ProductID] [nvarchar](50) NOT NULL,
	[Qty] [int] NOT NULL,
	[DiscountInPer] [decimal](18, 0) NOT NULL,
	[ProductName] [nvarchar](100) NULL,
	[TaxCode] [nvarchar](50) NULL,
	[CGST] [nvarchar](50) NULL,
	[SGST] [nvarchar](50) NULL,
	[IGST] [nvarchar](50) NULL,
	[FinalPrice] [nvarchar](50) NULL,
	[Taxes] [nvarchar](50) NULL,
	[DiscountInRs] [nvarchar](50) NULL,
	[DicountPrice] [decimal](18, 0) NULL,
 CONSTRAINT [PK] PRIMARY KEY CLUSTERED 
(
	[QuatID] ASC,
	[Position] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_SharedView]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_SharedView](
	[MenuCode] [nvarchar](50) NOT NULL,
	[ViewCode] [nvarchar](50) NULL,
	[MenuName] [nvarchar](50) NOT NULL,
	[ParentMenu] [nvarchar](50) NULL,
	[MenuPath] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_States]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_States](
	[StateID] [int] IDENTITY(1,1) NOT NULL,
	[StateName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_tbl_States] PRIMARY KEY CLUSTERED 
(
	[StateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Taxes]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Taxes](
	[TaxCode] [int] IDENTITY(1,1) NOT NULL,
	[TaxName] [nvarchar](50) NOT NULL,
	[Taxper] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_TaxesComponent]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_TaxesComponent](
	[TaxCode] [int] NOT NULL,
	[Component] [nvarchar](50) NOT NULL,
	[Taxper] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_UOM]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_UOM](
	[UOMCode] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_UserLogin]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_UserLogin](
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[MobNo] [nvarchar](50) NULL,
	[role] [nvarchar](50) NULL,
	[Image] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tbl_WorkerLogins] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_UserRole]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_UserRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserRole] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_tbl_UserRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_UserViews]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_UserViews](
	[Role] [nvarchar](50) NOT NULL,
	[Position] [varchar](20) NOT NULL,
	[MenuCode] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Role] ASC,
	[Position] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_AddCustomer]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_AddCustomer]
   
	@t_cnam nvarchar(50)=null,
	@t_cadd nvarchar(100)=null,
	@t_cmob nvarchar(100)=null,
	@t_catm nvarchar(100)=null,
	@t_cmai nvarchar(100)=null,
	@t_cdob nvarchar(100)=null,
	@t_cgst nvarchar(100)=null,
	@SId nvarchar(50)=null,
	@State nvarchar(50)=null,
	@Pincode nvarchar(50)=null,
	@City nvarchar(50)=null,
	@District nvarchar(50)=null,
	@Country nvarchar(50)=null,
	@Add1 nvarchar(50)=null,
	@Add2 nvarchar(50)=null,
	@Add3 nvarchar(50)=null,
	@billto nvarchar(50)=null,
	@shipto nvarchar(50)=null,
	@Landmark nvarchar(50)=null,
	@choice varchar(100)=null,
	@new_identity nvarchar(10)=null output,
	--@t_cuid nvarchar(10)=null output,
	@Return int output
	
AS
BEGIN
    declare @Id bigint
	declare @add bigint
	SET NOCOUNT ON;

	if @choice='check'
	begin
	If exists (select * from tbl_Customers where @t_cmob=MobNo)
	     begin  
		    select @Return = 1 
		 end
	Else
	      Begin
		    select @Return = 0
		  end 
    end


	if @choice='Exist'
	begin
	  select * from tbl_Customers where @t_cmob=MobNo
	end


	if @choice='Insert'
	begin
	SELECT MAX(CustID) FROM tbl_Customers
	select @Id=count(CustID)+1 from tbl_Customers

	Insert into tbl_Customers
		   (CustID,CustName,BillTo,MobNo,AltMobNo,EmailID,DOB,GSTNo,ShipTo)
		   values
		   (@Id,@t_cnam,@billto,@t_cmob,@t_catm,@t_cmai,@t_cdob,@t_cgst,@shipto)
		   set @Return = @Id
		   return @Return
	end

	if @choice='AddAddress'
	begin



	Insert into tbl_CustomerAddress
		   (AddressCode,CustomerName,City,District,State,Country,Address1,Address2,Address3)
		   values
		   ((select count(AddressCode)+1 from tbl_CustomerAddress),@t_cnam,@City,@District,@State,@Country,@t_cadd,@Add2,@Add3)
		   select @Return = AddressCode from tbl_CustomerAddress

	end

END

GO
/****** Object:  StoredProcedure [dbo].[SWQuot_AddNewImg]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_AddNewImg]
    @ProdID nvarchar(50)=null,
	@ImgPath nvarchar(500)=null,
	@ImgName nvarchar(100)=null
AS
BEGIN
    declare @PId bigint
	declare @PColour nvarchar

	if exists(select Position from tbl_ProductImg where ProductID = @ProdID)
	   begin
	     set @PId = ((select max (Position) from tbl_ProductImg where ProductID = @ProdID)+1);
	   end
	else
	   begin
	     set @PId='1';
	   end
	set @PColour = (select ProductColour from tbl_ProductImg where ProductID = @PId);
	SET NOCOUNT ON;
	insert into tbl_ProductImg
	         (Position,ProductID,ImgName,ProductColour,ImgPath) 
	         values
	         (@PId,@ProdID,@ImgName,@PColour,@ImgPath)

END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_AddProduct]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_AddProduct]
	@ProdCatogery nvarchar(50)=null,
	@ProdName nvarchar(100)= null,
	@ImgPath nvarchar(500)=null,
	@PColour nvarchar(50)=null,
	@ImgName nvarchar(100)=null,
	@PPrice nvarchar(100)=null,
	@PId nvarchar(100)=null,
	@Position nvarchar(100)=null,
	@Height decimal =null,
	@Width decimal =null,
	@Depth decimal =null,
	@Thickness decimal =null,
	@UOM nvarchar(10)=null,
	@delete INT=null OUTPUT,
	@return nvarchar(100)=null OUTPUT,
	@Back nvarchar(100)=null OUTPUT,
	@choice varchar(100)=null

	
AS
BEGIN
    declare @Id bigint
	declare @Prod bigint
	declare @ProdID bigint
	declare @Post bigint=0
	declare @ProductID bigint
	declare @ProdList nvarchar
	declare @OldPostion bigint
	

	SET NOCOUNT ON;
	If @choice='Insert'
	   begin

	        select @Id = count(ProductID)+1 from tbl_Products


			--Add to tbl_Products
	        insert into tbl_Products
	        (ProductID,ProductCatogery,ProductName,Height,Width,Depth,Thickness,UOM)
	        values
		    (@Id,@ProdCatogery,@ProdName,@Height,@Width,@Depth,@Thickness,@UOM)
		    set @Prod=SCOPE_IDENTITY()

            select ProductId from tbl_ProductImg 
             If exists (select * from tbl_ProductImg where ProductID=@Prod) 

	        select @Post = count(Position)+1 from tbl_ProductImg
			select @ProdID = MAX(ProductID) FROM tbl_Products


			--Add to tbl_ProductImg
			 insert into tbl_ProductImg
	         (Position,ProductID,ImgName,ProductColour,ImgPath) 
	         values
	         (@Post,@ProdID,@ImgName,@PColour,@ImgPath)
			

			--Add to tbl_ProductPrice
			insert into tbl_ProductPrice
	        (ProductID,FromDate,ToDate,NetPrice) 
	        values
	        ((select MAX(ProductID) FROM tbl_Products),GETDATE(),'2050-12-31',@PPrice)

	   end 

	If @choice ='Delete'
	   Begin
	        If EXISTS (select ProductID from tbl_QuotLiner where ProductID = @PId)
	        Begin
		    print 1
	          select @delete= 0;
		    End
	   Else
	        Begin
		    set @Back = (select ImgName from tbl_ProductImg where ProductID = @PId);
			
	        delete from tbl_Products where ProductID= @PId
			delete from tbl_ProductPrice where ProductID= @PId
			delete from tbl_ProductImg where ProductID= @PId
		    select @delete= 1;
	   End
     End

	 If @choice ='DeleteImg'
	   Begin
	        delete from tbl_ProductImg where ProductID= @PId and Position=@Position
       End

	 If @choice ='InsertImg'
	     If exists(select * from tbl_ProductImg where ProductID=@Prod)
	         Begin
			     select @Post = Count(Position)+1 from tbl_ProductImg
	             select @ProdID = MAX(ProductID) FROM tbl_Products
			     select @OldPostion=((select Position from tbl_ProductImg where ProductID=@Prod)+1)
			          insert into tbl_ProductImg
	                  (Position,ProductID,ImgName,ImgPath) 
	                  values
	                  (@OldPostion,@ProdID,@ImgName,@ImgPath)
            End
	   else
			begin
			     set @Post =(select max(Position)+1 from tbl_ProductImg) --where ProductID=@Prod )
				 select @ProdID = MAX(ProductID) FROM tbl_Products
                 insert into tbl_ProductImg
	             (Position,ProductID,ImgName,ProductColour,ImgPath) 
	             values
	             (@Post,@ProdID,@ImgName,@PColour,@ImgPath)
		    end

	if @choice= 'ProductImage'
	begin
	   select * from tbl_ProductImg Where @PId=ProductID
	end

	if @choice= 'Update'
	begin
	   UPDATE tbl_Products
	        SET 
			ProductCatogery=@ProdCatogery,
			ProductName=@ProdName,
			Height=@Height,
			Width=@Width,
            Depth=@Depth,
	        Thickness=@Thickness,
	        UOM=@UOM
		 where ProductID=@PId;

		 UPDATE tbl_ProductPrice
	        SET 
			ToDate=GETDATE()
		 where ProductID=@PId;

		 insert into tbl_ProductPrice
	     (ProductID,FromDate,ToDate,NetPrice)
	     values
		 (@PId,GETDATE(),'2050-12-31',@PPrice)
		 --set @Prod=SCOPE_IDENTITY()

		 UPDATE tbl_ProductImg
	        SET 
			ProductColour=@PColour
		 where ProductID=@PId;
	end
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_AddtoLiner]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_AddtoLiner] 
    @QuotID int =null,
	@ProductID nvarchar(50) =null,
	@ProductName nvarchar(50) =null,
	@TaxCode nvarchar(50) =null,
	@CGST nvarchar(50) =null,
	@SGST nvarchar(50) =null,
	@IGST nvarchar(50) =null,
	@FinalPrice nvarchar(50) =null,
	@Qty Int =null,
	@Discount nvarchar(50)=null,
	@DiscountN nvarchar (50)=null,
	@DicoPri nvarchar(50)=null,
	@Taxes nvarchar(50)=null,
	@TaxesInNum decimal(18,0)=null,
	@Amt decimal(18,0)=null

AS
BEGIN
	declare @Id bigint

	SELECT MAX(QuatId) FROM tbl_QuotLiner
    If exists (select Position from tbl_QuotLiner where @QuotID=QuatId)
	     begin  
		   select @Id=count(Position)+1 from tbl_QuotLiner
		 end
	Else
	      Begin
		    select @Id=1
		  end 
    
	Insert into tbl_QuotLiner
		   (QuatId,Position,ProductID,ProductName,Qty,DiscountInPer,DiscountInRs,TaxCode,CGST,SGST,IGST,FinalPrice,DicountPrice,Taxes)
		   values
		   (@QuotID,@Id,@ProductID,@ProductName,@Qty,@Discount,@DiscountN,@TaxCode,@CGST,@SGST,@IGST,@FinalPrice,@DicoPri,@Taxes)
		
end
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_AddtoQuot]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE  [dbo].[SWQuot_AddtoQuot]
	@t_cuid nvarchar(10)=null,
	@billto nvarchar(15)=null,
	@shipto nvarchar(15)=null,
	@choice varchar(100)=null,
	@gst nvarchar(100)=null,
	@advance nvarchar(100)=null,
	@balance nvarchar(100)=null,
	@totalAmount nvarchar(100)=null,
	@tax decimal(18,0)=null,
	@NetAmt decimal(18,0)=null,
	@QuotId nvarchar(100)=null,
	@new_identity nvarchar(10)=null output,
	@Return nvarchar output
	
AS
BEGIN

    declare @gross bigint
	declare @net bigint
	declare @DiscAmt bigint
	SET NOCOUNT ON;

	if @choice='InsertIntoQuot'
	begin
	Insert into tbl_QuotHeader
		   (CustID,QuotationDate,BillTo,ShipTo)
		   values
		   (@t_cuid,(select GETDATE()),@billto,@shipto)
		   set @Return=SCOPE_IDENTITY()
		   return @Return
	end
    
	if @choice='Update'
	begin 
	select @gross=(select sum(NetPrice) as Price from tbl_ProductPrice PP
                   inner join tbl_QuotLiner QL on PP.ProductID=QL.ProductID
                   group by QL.QuatID
                   having QuatID=@QuotId);
    select @DiscAmt = (select sum([DicountPrice]) from tbl_QuotLiner where QuatID=@QuotId);
    select @net=(@gross-@DiscAmt)


	    UPDATE tbl_QuotHeader
	        SET 
			GrossAmt=@gross,
			DiscountAmt=@DiscAmt,
			NetAmt=@net,
			Tax=@tax,
            Advance=@advance,
	        Balance=@balance,
	        TotalAmt=@totalAmount
		 where QuatID=@QuotId;
	     set @Return=@QuotId;
		 return @Return
    end
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_AddUser]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE  [dbo].[SWQuot_AddUser]
   @username nvarchar(50)=null,
   @password nvarchar(20)=null,
   @name nvarchar(50)=null,
   @mobno nvarchar(12)=null,
   @role nvarchar(20)=null,
   @choice varchar(100)=null,
   @Return nvarchar(50) output
AS
BEGIN
    if @choice='Add'
	begin
	If exists (select username from tbl_UserLogin where @username=UserName)
	     begin  
		    select @Return = 1
		 end
    else
        begin
	     insert into tbl_UserLogin
	     (UserName,Password,Name,MobNo,role)
	     values
	     (@username,@password,@name,@mobno,@role)

		 select @Return = 0
	end
	end

	if @choice='Edit'
        begin
	     UPDATE tbl_UserLogin
	        SET 
			Password=@password,
			Name=@name,
			MobNo=@mobno,
            role=@role
		 where UserName=@username;	
	end

	if @choice='Delete'
        begin
	     delete from tbl_UserLogin where UserName=@username 
	end

END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_CustomerQuot]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_CustomerQuot]
	@Quat nvarchar(50)=null,
	@Id nvarchar(50)=null,
	@choice varchar(100)=null
AS
BEGIN
declare @billto int
declare @shipto int
    if @choice='GetList'
	  begin
	     select 
         cust.QuatID,
         cust.CustID,
         cust.QuotationDate,
		 cust.NetAmt,
		 cust.Tax,
		 cust.GrossAmt,
		 cust.DiscountAmt,
		 cust.TotalAmt,
		 cust.Advance,
		 cust.Balance,
		 customer.CustName,
		 customer.MobNo+' / '+customer.AltMobNo as MobileNo,
		 customer.EmailID,
		 customer.DOB,
		 customer.GSTNo,
		 (select MobNo from [tbl_UserLogin] where UserName=@id) as UserMobno,
		 blto.Address1+ ',<br>'+blto.Address2+',<br>'+blto.Address3+',<br>'+blto.District+',<br>'+blto.City+',<br>'+blto.State+',<br>'+blto.Country as Billto,
		 shto.Address1+',<br>'+shto.Address2+',<br>'+shto.Address3+',<br>'+shto.District+',<br>'+shto.City+',<br>'+shto.State+',<br>'+shto.Country as ShipTo
		from tbl_QuotHeader cust  
        left outer join  [SWQuot].[dbo].[tbl_CustomerAddress] blto
        on (blto.AddressCode = cust.BillTo)
        left outer join  [SWQuot].[dbo].[tbl_CustomerAddress] shto
        on (shto.AddressCode = cust.ShipTo)
        left outer join  [SWQuot].[dbo].[tbl_Customers] customer
        on ( customer.CustID=cust.CustID)
		where cust.QuatID=@Quat



	  end

	  if @choice='GetProduct'
	  begin
	  SELECT tbl_Products.ProductName,
	         tbl_ProductPrice.NetPrice,
			 --tbl_ProductImg.ImgPath,
			 tbl_ProductImg.ImgName,
			 tbl_ProductImg.ProductColour,
			 tbl_QuotLiner.Qty,
			 tbl_QuotLiner.DicountPrice,
			 tbl_QuotLiner.Taxes,
			 tbl_QuotLiner.FinalPrice
             FROM tbl_Products 
             inner JOIN tbl_ProductPrice
             ON tbl_Products.ProductID=tbl_ProductPrice.ProductID
             inner JOIN tbl_ProductImg
             ON tbl_Products.ProductID=tbl_ProductImg.ProductID and tbl_ProductImg.Position=0 
             inner JOIN tbl_QuotLiner
             ON tbl_Products.ProductID=tbl_QuotLiner.ProductID and tbl_QuotLiner.QuatID=@Quat ;
	  end
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_GetProductPrice]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_GetProductPrice]
	@ProdId nvarchar(50)
AS
BEGIN
declare @todaydate date;
set @todaydate = GETDATE();
select Top 1 NetPrice from tbl_ProductPrice 
                            where 
							tbl_ProductPrice.ProductID = @ProdId and  
							@todaydate between FromDate and ToDate order by FromDate desc

    
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_ProductDDL]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SWQuot_ProductDDL]
      (@PId nvarchar(20)=null)
AS
BEGIN

    -- Insert statements for procedure here
	SELECT ProductId,ProductName from tbl_Products where ProductID=@PId or @PId is null 
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_ProductDetails]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_ProductDetails] 
	@ProductId nvarchar(50)
AS
BEGIN
declare @todaydate date;
set @todaydate = GETDATE();

	(select  tbl_Products.ProductID,
			         tbl_Products.ProductName,
                     tbl_Products.ProductCatogery,
					 tbl_Products.UOM,
					 tbl_Products.Height,
					 tbl_Products.Width,
					 tbl_Products.Depth,
					 tbl_Products.Thickness,
					 tbl_ProductImg.ProductColour,
					 (select Top 1 NetPrice from tbl_ProductPrice
                      where ProductID=@ProductId and @todaydate between FromDate and ToDate order by FromDate desc)
             from tbl_Products, tbl_ProductImg  WHERE tbl_Products.ProductID = @ProductId and tbl_ProductImg.ProductID= @ProductId)

END 
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_ProductList]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SWQuot_ProductList]
	--@ProductId nvarchar(50),
	@return nvarchar(100)=null OUTPUT
AS
 declare @todaydate date
 set @todaydate =GETDATE()
BEGIN
    --select * from  (select tbl_Products.ProductID,
			 --              tbl_Products.ProductName,
    --                       tbl_Products.ProductCatogery,
				--	     --tbl_Products.ProductColour,
	   --                  --tbl_ProductPrice.NetPrice,
				--		   (select Top 1 NetPrice from tbl_ProductPrice 
    --                        where 
				--			--tbl_Products.ProductID and 
				--			@todaydate between FromDate and ToDate order by FromDate desc)
    --                from ( tbl_Products
    --                inner join tbl_ProductPrice on tbl_Products.ProductID = tbl_ProductPrice.ProductID)) As Id     
		  -- return;


		   select tbl_Products.ProductID,
		          tbl_Products.ProductName,
		          tbl_Products.ProductCatogery,
				  (select Top 1 NetPrice from tbl_ProductPrice 
                            where 
							tbl_Products.ProductID=tbl_ProductPrice.ProductID and 
							@todaydate between FromDate and ToDate order by FromDate desc)
			from tbl_Products

END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_StateDDL]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_StateDDL] 
	(@SId nvarchar(20)=null)
AS
BEGIn

	SELECT StateID,StateName from tbl_States where StateID=@SId or @SId is null 
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_Taxes]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_Taxes] 
	@getcode int=null
AS
BEGIN
    SELECT SUM(Taxper) 
    FROM tbl_TaxesComponent where tbl_TaxesComponent.TaxCode=@getcode;
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_UserDetails]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE  [dbo].[SWQuot_UserDetails]
	-- Add the parameters for the stored procedure here
	@UserId nvarchar(50)=null,
	@choice nvarchar(50)=null
AS
BEGIN
	if @choice='Detail'
	begin
	SELECT
	--tbl_UserLogin.UserName,
          --tbl_UserLogin.role,
		  --tbl_UserLogin.Image,
          tbl_SharedView.MenuPath,
          tbl_SharedView.MenuName
    FROM tbl_UserLogin
          JOIN tbl_UserViews
    ON tbl_UserViews.Role = tbl_UserLogin.role
          and tbl_UserLogin.UserName= @UserId
          JOIN tbl_SharedView
		  ON tbl_SharedView.MenuCode = tbl_UserViews.MenuCode
    --      tbl_UserLogin.UserName,
    --      tbl_UserLogin.role,
    --      tbl_UserViews.MenuCode,
    --      tbl_SharedView.MenuName
    --FROM tbl_UserLogin
    --      JOIN tbl_UserViews
    --ON tbl_UserViews.Role = tbl_UserLogin.role
    --      and tbl_UserLogin.UserName= @UserId
    --      JOIN tbl_SharedView
    --ON tbl_SharedView.MenuCode = tbl_UserViews.MenuCode
	end

	if @choice='UserDetail'
	begin
	Select tbl_UserLogin.Name,
	       tbl_UserLogin.Image 
		   from tbl_UserLogin where tbl_UserLogin.UserName=@UserId
	end
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_UserLogin]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_UserLogin]
     @t_usid nvarchar(50),
	 @t_pass nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    --select distinct UserName,Password as t_levl  from tbl_WorkerLogins
	SELECT distinct UserName,Password,Name,Image FROM  tbl_UserLogin
	WHERE UserName=@t_usid and Password =  @t_pass
END
GO
/****** Object:  StoredProcedure [dbo].[SWQuot_UserProductList]    Script Date: 29-11-2022 17:24:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SWQuot_UserProductList]
AS
BEGIN
	SELECT 
	     tbl_Products.ProductID,
		 tbl_Products.ProductName,
		 tbl_ProductPrice.NetPrice,
		 tbl_ProductImg.ImgName,
		 tbl_ProductImg.ImgPath
    FROM tbl_Products
          JOIN tbl_ProductImg
    ON tbl_Products.ProductID = tbl_ProductImg.ProductID
          JOIN tbl_ProductPrice
    ON tbl_Products.ProductID = tbl_ProductPrice.ProductID

END
GO
USE [master]
GO
ALTER DATABASE [SWQuot] SET  READ_WRITE 
GO
