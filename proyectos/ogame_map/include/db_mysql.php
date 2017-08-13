<?

class DB_Sql {

	var $Host     = "";
	var $Database = "";
	var $User     = "";
	var $Password = "";

	var $Link_ID  = 0;
	var $query_id = 0;

	/*
	 * Function that connect to the specified databse using the
	 * given connection url.
	 * protocol://user:password@host/table
	 *
	 * Params:	url (string): connection url
	 */
	function db_connect($url) {
		$url = parse_url($url);

		if (isset($url["port"])) {
			$url["host"] = $url["host"] . ":" . $url["port"];
		}

		$url["path"] = substr($url["path"], 1);

		if ($this->Database == "") $this->Database = $url["path"] ;
		if ($this->Host == "") $this->Host = $url["host"];
		if ($this->User == "") $this->User = $url["user"];
		if ($this->Password == "") $this->Password = $url["pass"];

		$this->Link_ID = @mysql_pconnect($this->Host, $this->User, $this->Password);
		if (!$this->Link_ID) {
			$this->db_halt("pconnect($this->Database) failed.");
			return 0;
		}

		if (!mysql_select_db($this->Database,$this->Link_ID)) {
			$this->db_halt("cannot use database ".$this->Database);
			return 0;
		}

		return $this->Link_ID;
	}

	function db_disconnect(){
		if ($this->Link_ID) @mysql_close($this->Link_ID);
	}

	/*
	 * Function that executes a SQL query.
	 *
	 * Params:	query (string): SQL query
	 */
	function db_query($query, $resultado = false) {
		$this->query_id = @mysql_query($query, $this->Link_ID);
		if ($resultado == true){
			while($tmp = $this->db_next()){
				$info_elements[]=$tmp;
			}
			return $info_elements;
		}
	}

	/*
	 * Function that returns an array result from an executed query.
	 * Every column is labeled with the column name in the DB
	 *
	 * Params:	none
	 *
	 * Returns:	array with one result or NULL if there are no more rows or
	 *		no query was executed
	 */
	function db_next(){
		if ($this->query_id != NULL){
			$row = @mysql_fetch_row($this->query_id);
			if ($row != NULL){
				foreach($row as $i => $value){
					$column = @mysql_field_name($this->query_id,$i);
					$resultado["$column"] = $value;	  
				}
				return ($resultado);
			}else{
				return NULL;
			}
		}else{
			return NULL;
		}
	}

	/*
	 * Function that shows in HTML a description of a MySQL error if
	 * something goes wrong
	 *
	 * Params:	msg (string): Description of the error
	 */
	function db_halt($msg) {
		printf("<b><u>Database error</u>:</b> %s<br>\n", $msg);
		printf("<b>MySQL Error</b>: %s (%s)<br>\n",
		@mysql_errno($this->Link_ID),
		@mysql_error($this->Link_ID));
	}
}
?>
