<?php

/**
 * Construye una frase sustituyendo los par�metros por sus valores dados en un array
 * 
 * Params:
 *      $msg: Mensaje original
 *      $param: Array cuyas claves son los par�metros a sustituir y los valores el nuevo texto
 *
 * Returns:
 *      Frase construida
 */
function __($msg, $param = NULL){
        if ($param) foreach($param as $key => $value) $msg = str_replace($key, $value, $msg);
        return $msg;
}

/**
 * Imprime una frase construyendo los par�metros por sus valores dados en un array
 * 
 * Params:
 *      $msg: Mensaje original
 *      $param: Array cuyas claves son los par�metros a sustituir y los valores el nuevo texto
 */
function ___($msg, $param = NULL){ echo __($msg, $param); }

?>
