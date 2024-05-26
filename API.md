# Session management
## /register
**/register/check**
```JSON
{
	"username": "Alice"
}
```

```JSON
{
	"success": true,
	"message": "Username available."
}
```

**/register/do_register**
```JSON
{
	"username": "Alice",
	"password": "abc@123"
}
```

```JSON
{
	"success": true,
	"message": "Account created."
}
```


## /auth
**/auth/login**
```JSON
{
	"username": "Alice",
	"password": "abc@123"
}
```

```JSON
{
	"success": true,
	"message": "Login successful."
}
----------------
{
	"success": false,
	"message": "Wrong username or password.",
}
```

**/auth/logout**
```JSON
{}
```

```JSON
{
	"success": true,
	"message": "Logout successful.",
}
```

---------
# Core
## /archive
**/archive/is_archived**  #polling
Check trạng thái của URL mục tiêu
```JSON
{
	"url": "https://abc.com/index.html"
}
```

```JSON
{
	"success": true,
	"status": "not_archived"/"archiving"/"archived",
}
```
- not_archived = Chưa lưu
- archiving = Đang lưu, tiếp tục poll để kiểm tra trạng thái
- archived = Đã lưu

**/archive/do_archive**
Bắt đầu thực hiện lưu URL mục tiêu
```JSON
{
	"url": "https://abc.com/index.html"
}
```

```JSON
{
	"success": true,
	"message": "Archiving target site, please wait.",
}
-------
{
	"success": false,
	"message": "Max number of archiving requests exceeded.",
}
```

**/archive/list**
Sau khi gọi `/archive/check` nếu trả về trạng thái `archived` --> Tiếp tục  gọi API này để lấy danh sách các snapshots đã lưu
```JSON
{
	"url": "https://abc.com/index.html"
}
```
*Note:* Back-end có thể bị NoSQL injection

```JSON
{
	"success": true,
	"snapshot_list": [
		{
			"snapshot_id": "661f76eb-420d-40a6-a2fa-4ada7c25375c",
			"timestamp": 1712087936  //unix timestamp
		},
		{
			"snapshot_id": "23c77798-86a8-4bf7-bbb7-57829146b6fb",
			"timestamp": 1711999999
		}
	]
}
----
{
	"success": false    // URL chưa archive / DB error / ...
}
```
- Convert timestamp sang Ngày-Tháng-Năm để hiển thị cho user

**/archive/view_raw**
```JSON
{
	"snapshot_id": "661f76eb-420d-40a6-a2fa-4ada7c25375c"
}
```

```JSON
<raw html>
```

---
# Misc.
## /bookmark
**/bookmark/recent**
Recently viewed URLs
```JSON
{}
```

```JSON
{
	"success": true,
	"recent_urls": [
		"https://abc.com/index.html",
		"https://xyz.net/aaa"
	]
}
```

**/bookmark/add**
```JSON
{
	"url": "https://xyz.net/aaa"
}
```

```JSON
{
	"success": true
}
```

**/bookmark/remove**
```JSON
{
	"url": "https://xyz.net/aaa"
}
```

```JSON
{
	"success": true
}
```

**/bookmark/add_tag**
```JSON
{
	"url": "https://xyz.net/aaa",
	"tags": ["cooking", "gift"]
}
```

```JSON
{
	"success": true
}
-----
{
	"success": false     // url not added to bookmark?
}
```

**/bookmark/remove_tag**
```JSON
{
	"url": "https://xyz.net/aaa",
	"tags": ["cooking", "gift"]
}
```

```JSON
{
	"success": true
}
-----
{
	"success": false     // tags not present
}
```

**/bookmark/list**
```JSON
{}
```

```JSON
{
	"success": true,
	"bookmarks": [
		{"url": "https://abc.com/index.html", "tags": []},
		{"url": "https://xyz.net/aaa", "tags": ["gift", "cooking"]},
		...
	]
}
```

**/bookmark/list_by_tag**
```JSON
{
	"list_by_tag": "cooking"
}
```

```JSON
{
	"success": true,
	"bookmarks": [
		{"url": "https://xyz.net/aaa", "tags": ["gift", "cooking"]}
	]
}
```
